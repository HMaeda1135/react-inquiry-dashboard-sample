import { useCallback, useMemo, useState } from 'react';
import type { Inquiry, InquiryCategory, InquiryPriority, InquiryStatus } from './types/inquiry';
import type { ActiveTab } from './types/navigation';
import { AppHeader } from './components/AppHeader';
import { Sidebar } from './components/Sidebar';
import { SummaryCards } from './components/SummaryCards';
import { OverviewPanel } from './components/OverviewPanel';
import { InquiryFilters } from './components/InquiryFilters';
import { InquiryList } from './components/InquiryList';
import { InquiryDetail, InquiryDetailPlaceholder } from './components/InquiryDetail';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { loadInquiries, resetInquiries, saveInquiries } from './utils/storage';
import './App.css';

const ITEMS_PER_PAGE = 10;

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => loadInquiries());
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'すべて'>('すべて');
  const [categoryFilter, setCategoryFilter] = useState<InquiryCategory | 'すべて'>('すべて');
  const [priorityFilter, setPriorityFilter] = useState<InquiryPriority | 'すべて'>('すべて');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);

  const selectedInquiry = useMemo(
    () => inquiries.find((inquiry) => inquiry.id === selectedId) ?? null,
    [inquiries, selectedId],
  );

  const filteredInquiries = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const matchesKeyword =
        normalizedKeyword === '' ||
        inquiry.contactName.toLowerCase().includes(normalizedKeyword) ||
        inquiry.companyOrType.toLowerCase().includes(normalizedKeyword) ||
        inquiry.subject.toLowerCase().includes(normalizedKeyword) ||
        inquiry.body.toLowerCase().includes(normalizedKeyword);

      const matchesStatus =
        statusFilter === 'すべて' || inquiry.status === statusFilter;

      const matchesCategory =
        categoryFilter === 'すべて' || inquiry.category === categoryFilter;

      const matchesPriority =
        priorityFilter === 'すべて' || inquiry.priority === priorityFilter;

      return matchesKeyword && matchesStatus && matchesCategory && matchesPriority;
    });
  }, [inquiries, keyword, statusFilter, categoryFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE));
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedInquiries = useMemo(() => {
    const start = (effectivePage - 1) * ITEMS_PER_PAGE;
    return filteredInquiries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredInquiries, effectivePage]);

  const { rangeStart, rangeEnd } = useMemo(() => {
    if (filteredInquiries.length === 0) {
      return { rangeStart: 0, rangeEnd: 0 };
    }
    const start = (effectivePage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(effectivePage * ITEMS_PER_PAGE, filteredInquiries.length);
    return { rangeStart: start, rangeEnd: end };
  }, [filteredInquiries.length, effectivePage]);

  const handleKeywordChange = useCallback((value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: InquiryStatus | 'すべて') => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: InquiryCategory | 'すべて') => {
    setCategoryFilter(value);
    setCurrentPage(1);
  }, []);

  const handlePriorityChange = useCallback((value: InquiryPriority | 'すべて') => {
    setPriorityFilter(value);
    setCurrentPage(1);
  }, []);

  const handleSelectInquiry = useCallback((inquiry: Inquiry) => {
    setSelectedId(inquiry.id);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastVisible(false);
  }, []);

  const handleSaveInquiry = useCallback(
    (id: number, status: InquiryStatus, priority: InquiryPriority, memo: string) => {
      setInquiries((prev) => {
        const updated = prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status, priority, memo } : inquiry,
        );
        saveInquiries(updated);
        return updated;
      });
      setToastKey((key) => key + 1);
      setToastVisible(true);
    },
    [],
  );

  const handleResetData = useCallback(() => {
    const reset = resetInquiries();
    setInquiries(reset);
    setKeyword('');
    setStatusFilter('すべて');
    setCategoryFilter('すべて');
    setPriorityFilter('すべて');
    setCurrentPage(1);
    setSelectedId(null);
  }, []);

  const handleGoToInquiries = useCallback(() => {
    setActiveTab('inquiries');
  }, []);

  return (
    <div className="app">
      <AppHeader />

      <div className="app-body">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="app-content">
          <div className="notice" role="note">
            <p>
              この画面はポートフォリオ掲載用の架空ダッシュボードサンプルです。
              実在する顧客情報は含まれておらず、実際の送信・保存処理は行いません。
            </p>
          </div>

          {activeTab === 'overview' && (
            <div
              id="panel-overview"
              role="tabpanel"
              aria-labelledby="tab-overview"
              className="tab-panel"
            >
              <SummaryCards inquiries={inquiries} />
              <OverviewPanel inquiries={inquiries} onGoToInquiries={handleGoToInquiries} />
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div
              id="panel-inquiries"
              role="tabpanel"
              aria-labelledby="tab-inquiries"
              className="tab-panel"
            >
              <InquiryFilters
                keyword={keyword}
                statusFilter={statusFilter}
                categoryFilter={categoryFilter}
                priorityFilter={priorityFilter}
                onKeywordChange={handleKeywordChange}
                onStatusChange={handleStatusChange}
                onCategoryChange={handleCategoryChange}
                onPriorityChange={handlePriorityChange}
                onResetData={handleResetData}
              />

              <div className="workspace workspace--split">
                <InquiryList
                  inquiries={paginatedInquiries}
                  totalItems={filteredInquiries.length}
                  selectedId={selectedId}
                  currentPage={effectivePage}
                  totalPages={totalPages}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  onPageChange={setCurrentPage}
                  onSelect={handleSelectInquiry}
                />

                <div className="detail-panel-slot">
                  {selectedInquiry ? (
                    <InquiryDetail
                      key={selectedInquiry.id}
                      inquiry={selectedInquiry}
                      mode="panel"
                      onSave={handleSaveInquiry}
                    />
                  ) : (
                    <InquiryDetailPlaceholder />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <Toast
        key={toastKey}
        message="保存しました"
        visible={toastVisible}
        onClose={handleToastClose}
      />
    </div>
  );
}

export default App;
