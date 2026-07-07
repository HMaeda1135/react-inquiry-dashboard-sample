import { useEffect } from 'react';

type ToastProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
};

export function Toast({ message, visible, onClose, duration = 2500 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [visible, onClose, duration, message]);

  if (!visible) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}
