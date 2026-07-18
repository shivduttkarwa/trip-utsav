import { createContext, useCallback, useContext, useRef, useState } from "react";

/* App-wide UI state: the shared enquiry modal and toast notifications */

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [enquiry, setEnquiry] = useState({ open: false, prefill: "" });
  const [toast, setToast] = useState({ show: false, msg: "" });
  const toastTimer = useRef();

  const openEnquiry = useCallback((prefill = "") => {
    setEnquiry({ open: true, prefill });
    document.body.style.overflow = "hidden";
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiry((s) => ({ ...s, open: false }));
    document.body.style.overflow = "";
  }, []);

  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast({ show: true, msg });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 4200);
  }, []);

  return (
    <UIContext.Provider value={{ enquiry, openEnquiry, closeEnquiry, toast, showToast }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
