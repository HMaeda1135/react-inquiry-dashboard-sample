import { useCallback, useMemo, useState } from 'react';
import type { Inquiry, InquiryCategory, InquiryPriority, InquiryStatus } from './types/inquiry';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { FilterPanel } from './components/FilterPanel';
import { InquiryList } from './components/InquiryList';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { loadInquiries, resetInquiries, saveInquiries } from './utils/storage';
import './App.css';

const ITEMS_PER_PAGE = 10;

function App() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => loadInquiries());
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'すべて'>('すべて');
  const [categoryFilter, setCategoryFilter] = useState<InquiryCategory | 'すべて'>('すべて');
  const [priorityFilter, setPriorityFilter] = useState<InquiryPriority | 'すべて'>('すべて');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filteredInquiries = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const matchesKeyword =
        normalizedKeyword === '' ||
        inquiry.title.toLowerCase().includes(normalizedKeyword) ||
        inquiry.clientName.toLowerCase().includes(normalizedKeyword) ||
        inquiry.summary.toLowerCase().includes(normalizedKeyword);

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

  const handleOpenDetail = useCallback((inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedInquiry(null);
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
    setSelectedInquiry(null);
  }, []);

  return (
    <div className="app">
      <Header />

      <main className="main">
        <div className="notice" role="note">
          <p>
            この画面はポートフォリオ掲載用の架空ダッシュボードサンプルです。
            実在する顧客情報は含まれていません。
          </p>
        </div>

        <SummaryCards inquiries={inquiries} />

        <FilterPanel
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

        <InquiryList
          inquiries={paginatedInquiries}
          totalItems={filteredInquiries.length}
          currentPage={effectivePage}
          totalPages={totalPages}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onPageChange={setCurrentPage}
          onOpenDetail={handleOpenDetail}
        />
      </main>

      <Footer />

      {selectedInquiry && (
        <InquiryModal
          key={selectedInquiry.id}
          inquiry={selectedInquiry}
          onClose={handleCloseModal}
          onSave={handleSaveInquiry}
        />
      )}
    </div>
  );
}

export default App;
