import React from 'react';
import { LuUpload, LuCheck } from 'react-icons/lu';

export default function SectionCardHeader({
    title,
    keyBadge,
    description,
    hasUnsaved = false,
    onUpload,
    isSaving = false,
    customAction = null
}) {
    return (
        <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
                <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
                        {title}
                    </h2>
                    {keyBadge && (
                        <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            {keyBadge}
                        </code>
                    )}
                </div>
                {description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
                {customAction}

                {hasUnsaved ? (
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

                {onUpload && (
                    <button
                        type="button"
                        onClick={onUpload}
                        disabled={!hasUnsaved || isSaving}
                        title={hasUnsaved ? "Upload changes to database" : "No unsaved changes"}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            hasUnsaved
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                        }`}
                    >
                        {isSaving ? (
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <LuUpload size={13} strokeWidth={2.5} />
                        )}
                        <span>{isSaving ? 'Uploading...' : 'Upload'}</span>
                    </button>
                )}
            </div>
        </div>
    );
}
