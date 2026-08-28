import React, { useState, useEffect } from 'react';

export default function LinkItemModal({ isOpen, initialData, onSave, onClose }) {
    const [name, setName] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || initialData.label || '');
            setTo(initialData.to || initialData.href || '');
        } else {
            setName('');
            setTo('');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, to });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                        {initialData ? 'Edit Navigation Link' : 'Add Navigation Link'}
                    </h3>
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Display Label / Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Projects, Research, Blog"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                            Target Path / URL
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. /projects, /research, https://..."
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all"
                        >
                            Save Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
