import React from 'react';

export default function ConfirmModal({ isOpen, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, isDanger = false }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                onClick={onCancel}
            />
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-2xl ${isDanger ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>
                        {isDanger ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-xl text-xs font-black text-white shadow-md transition-all ${
                            isDanger 
                                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20' 
                                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
