import React, { createContext, useContext, useState } from 'react';

type Toast = {
  message: string;
  isError: boolean;
};

const ToastContext = createContext<(toast: Toast) => void>(() => {});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000); // auto-dismiss
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-container">
        {toasts.map((tst, ind) => (
          <div
            key={ind}
            className={`toast ${
              tst.isError ? 'error' : 'success' 
            }`}
          >
            {tst.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);