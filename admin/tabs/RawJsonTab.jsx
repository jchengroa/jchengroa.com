import React, { useState } from 'react';
import { LuUpload, LuCheck } from 'react-icons/lu';

export default function RawJsonTab({ 
    allSiteContent = {}, 
    onChangeAllSiteContent, 
    onUploadKey, 
    onShowToast,
    saving = false 
}) {
    const keys = Object.keys(allSiteContent).sort();
    const [selectedKey, setSelectedKey] = useState(keys[0] || 'site_active');
    const [rawText, setRawText] = useState(() => {
        const val = allSiteContent[keys[0] || 'site_active'];
        return typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val ?? '');
    });
    const [errorMsg, setErrorMsg] = useState(null);

    const savedRawString = (() => {
        const val = allSiteContent[selectedKey];
        return typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val ?? '');
    })();

    const isKeyChanged = rawText.trim() !== savedRawString.trim();

    const handleSelectKey = (key) => {
        setSelectedKey(key);
        setErrorMsg(null);
        const val = allSiteContent[key];
        setRawText(typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val ?? ''));
    };

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(rawText);
            setRawText(JSON.stringify(parsed, null, 2));
            setErrorMsg(null);
        } catch {
            setErrorMsg('Invalid JSON format. Cannot beautify.');
        }
    };

    const handleUpload = async () => {
        setErrorMsg(null);
        let parsed;
        try {
            try {
                parsed = JSON.parse(rawText);
            } catch {
                if (rawText.trim() === 'true') parsed = true;
                else if (rawText.trim() === 'false') parsed = false;
                else parsed = rawText;
            }

            if (onUploadKey) {
                await onUploadKey(selectedKey, parsed);
            } else {
                onChangeAllSiteContent({
                    ...allSiteContent,
                    [selectedKey]: parsed
                });
            }
            if (onShowToast) onShowToast('success', `"${selectedKey}" uploaded and saved to DB!`);
        } catch (e) {
            setErrorMsg(`Upload error: ${e.message}`);
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* RAW KEY-VALUE / JSON EDITOR */}
            <div className="p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5 sm:space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Raw Database JSON Editor
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Directly inspect, edit, and upload individual document keys in <code className="text-blue-600 font-mono text-[11px]">site_content</code>.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        {isKeyChanged ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                Unsaved changes
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                                <LuCheck size={12} strokeWidth={3} className="text-emerald-500" />
                                Saved
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={handleFormat}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer shrink-0"
                        >
                            Format JSON
                        </button>

                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={!isKeyChanged || saving}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                                isKeyChanged
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                            }`}
                        >
                            {saving ? (
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <LuUpload size={13} strokeWidth={2.5} />
                            )}
                            <span>{saving ? 'Uploading...' : 'Upload to DB'}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    <div className="lg:col-span-1 space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                            Select Key ({keys.length})
                        </label>
                        <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-1.5 pb-2 lg:pb-0 max-h-none lg:max-h-96 no-scrollbar">
                            {keys.map(k => (
                                <button
                                    key={k}
                                    type="button"
                                    onClick={() => handleSelectKey(k)}
                                    className={`shrink-0 lg:shrink text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 min-h-[38px] ${
                                        selectedKey === k
                                            ? 'bg-blue-600 text-white shadow-xs font-bold'
                                            : 'bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <span className="truncate leading-normal">{k}</span>
                                    {selectedKey === k && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                                Editing: site_content['{selectedKey}']
                            </span>
                            {errorMsg && (
                                <span className="text-xs font-bold text-rose-500">{errorMsg}</span>
                            )}
                        </div>
                        <textarea
                            rows={14}
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                            className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-900 text-green-400 font-mono text-xs leading-relaxed border border-gray-800 outline-none focus:ring-2 focus:ring-blue-600 shadow-inner"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
