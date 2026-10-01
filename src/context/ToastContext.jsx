import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import './Toast.css';
import { CheckIcon, CloseIcon, SparkleIcon, TrashIcon } from '../components/layouts/Icons/Icons';

const ToastContext = createContext(null);

const ICONS = {
    success: CheckIcon,
    info: SparkleIcon,
    remove: TrashIcon,
};

let uid = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timers = useRef({});

    const dismiss = useCallback((id) => {
        clearTimeout(timers.current[id]);
        delete timers.current[id];
        setToasts((list) => list.filter((t) => t.id !== id));
    }, []);

    const notify = useCallback(({ title, message, type = 'info', duration = 3200 }) => {
        const id = ++uid;
        // keep the stack short on small screens
        setToasts((list) => [...list.slice(-2), { id, title, message, type }]);
        timers.current[id] = setTimeout(() => dismiss(id), duration);
    }, [dismiss]);

    const value = useMemo(() => ({ notify }), [notify]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {createPortal(
                <ol className="toastStack" aria-live="polite">
                    <AnimatePresence initial={false}>
                        {toasts.map((toast) => {
                            const Icon = ICONS[toast.type] || SparkleIcon;
                            return (
                                <motion.li
                                    key={toast.id}
                                    layout
                                    className={`toast toast-${toast.type}`}
                                    initial={{ opacity: 0, y: -24, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 80, scale: 0.9, transition: { duration: 0.25 } }}
                                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                                >
                                    <span className="toastIcon"><Icon /></span>
                                    <div className="toastText">
                                        <p className="toastTitle">{toast.title}</p>
                                        {toast.message && <p className="toastMessage">{toast.message}</p>}
                                    </div>
                                    <button className="toastClose" onClick={() => dismiss(toast.id)} aria-label="Dismiss notification">
                                        <CloseIcon />
                                    </button>
                                    <motion.span
                                        className="toastProgress"
                                        initial={{ scaleX: 1 }}
                                        animate={{ scaleX: 0 }}
                                        transition={{ duration: 3.2, ease: 'linear' }}
                                    />
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </ol>,
                document.body
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
