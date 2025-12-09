import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity" role="dialog" aria-modal="true">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-red-500 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;