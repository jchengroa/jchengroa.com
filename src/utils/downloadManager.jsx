import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, TIMING, EASING } from "../utils/animations.js";
import axios from "axios";

// Helper to format bytes to human-readable format
const formatBytes = (bytes, decimals = 2) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export function DownloadManager() {
    const [downloads, setDownloads] = useState([]);
    const [isMinimized, setIsMinimized] = useState(false);
    const downloadsRef = useRef(downloads);

    useEffect(() => {
        downloadsRef.current = downloads;
    }, [downloads]);

    const startDownload = async (url, filename) => {
        // Prevent duplicate active downloads for the same file
        const existing = downloadsRef.current.find(
            (d) => d.url === url && (d.status === "downloading" || d.status === "connecting")
        );
        if (existing) {
            setIsMinimized(false);
            return;
        }

        const id = `${url}-${Date.now()}`;
        const source = axios.CancelToken.source();

        const newDownload = {
            id,
            url,
            filename,
            progress: 0,
            status: "connecting",
            speed: "0 KB/s",
            loaded: "0 KB",
            total: "Unknown",
            cancelTokenSource: source,
            startTime: Date.now()
        };

        setDownloads((prev) => [newDownload, ...prev]);
        setIsMinimized(false);

        try {
            const response = await axios({
                url,
                method: "GET",
                responseType: "blob",
                cancelToken: source.token,
                onDownloadProgress: (progressEvent) => {
                    const total = progressEvent.total || 0;
                    const loaded = progressEvent.loaded || 0;
                    const percentCompleted = total > 0 ? Math.round((loaded * 100) / total) : 0;

                    // Calculate speed
                    const elapsed = (Date.now() - newDownload.startTime) / 1000; // seconds
                    const bps = elapsed > 0 ? loaded / elapsed : 0; // bytes per second
                    const speedStr = formatBytes(bps) + "/s";

                    setDownloads((prev) =>
                        prev.map((d) => {
                            if (d.id === id) {
                                return {
                                    ...d,
                                    status: "downloading",
                                    progress: percentCompleted,
                                    loaded: formatBytes(loaded),
                                    total: total > 0 ? formatBytes(total) : "Unknown",
                                    speed: speedStr
                                };
                            }
                            return d;
                        })
                    );
                }
            });

            // Handle successful download
            const blob = new Blob([response.data], {
                type: response.headers["content-type"] || "application/pdf"
            });
            const blobUrl = window.URL.createObjectURL(blob);

            // Create download link and trigger download prompt
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();

            setDownloads((prev) =>
                prev.map((d) => {
                    if (d.id === id) {
                        return {
                            ...d,
                            status: "completed",
                            progress: 100,
                            blobUrl
                        };
                    }
                    return d;
                })
            );
        } catch (error) {
            if (axios.isCancel(error)) {
                setDownloads((prev) => prev.filter((d) => d.id !== id));
            } else {
                setDownloads((prev) =>
                    prev.map((d) => {
                        if (d.id === id) {
                            return {
                                ...d,
                                status: "error",
                                speed: "",
                                progress: 0
                            };
                        }
                        return d;
                    })
                );
            }
        }
    };

    const cancelDownload = (id) => {
        const download = downloads.find((d) => d.id === id);
        if (download && download.cancelTokenSource) {
            download.cancelTokenSource.cancel("Download cancelled by user.");
        }
    };

    const removeDownload = (id) => {
        setDownloads((prev) => {
            const download = prev.find((d) => d.id === id);
            if (download && download.blobUrl) {
                window.URL.revokeObjectURL(download.blobUrl);
            }
            return prev.filter((d) => d.id !== id);
        });
    };

    const retryDownload = (url, filename, id) => {
        removeDownload(id);
        startDownload(url, filename);
    };

    const clearAll = () => {
        downloads.forEach((d) => {
            if (d.status === "downloading" || d.status === "connecting") {
                d.cancelTokenSource?.cancel();
            }
            if (d.blobUrl) {
                window.URL.revokeObjectURL(d.blobUrl);
            }
        });
        setDownloads([]);
    };

    useEffect(() => {
        const handleDownloadEvent = (e) => {
            if (e.detail && e.detail.url) {
                startDownload(e.detail.url, e.detail.filename || "document.pdf");
            }
        };
        window.addEventListener("trigger-file-download", handleDownloadEvent);
        return () => {
            window.removeEventListener("trigger-file-download", handleDownloadEvent);
        };
    }, [downloads]);

    const activeCount = downloads.filter(
        (d) => d.status === "downloading" || d.status === "connecting"
    ).length;

    if (downloads.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[150] font-sans">
            <AnimatePresence mode="wait">
                {isMinimized ? (
                    /* Minimized State */
                    <motion.div
                        key="minimized"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        onClick={() => setIsMinimized(false)}
                        className="flex items-center gap-3 px-5 py-3.5 bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 font-bold rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-black/40 backdrop-blur-xl border border-gray-800 dark:border-gray-100 hover:scale-105 cursor-pointer transition-all duration-300 group"
                    >
                        {activeCount > 0 ? (
                            <svg
                                className="animate-spin h-5 w-5 text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-500 group-hover:translate-y-0.5 transition-transform"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        )}
                        <span className="text-xs uppercase tracking-wider font-black">
                            {activeCount > 0
                                ? `Downloading ${activeCount} File${activeCount > 1 ? "s" : ""}`
                                : `Downloads (${downloads.length})`}
                        </span>
                    </motion.div>
                ) : (
                    /* Maximized State */
                    <motion.div
                        key="maximized"
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", damping: 22, stiffness: 260 }}
                        className="w-[24rem] max-h-[28rem] flex flex-col bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-black/60 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </span>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                                    Downloads
                                </h3>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearAll}
                                    title="Clear All"
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    title="Minimize"
                                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[22rem] scrollbar-thin">
                            <AnimatePresence initial={false}>
                                {downloads.map((d) => (
                                    <motion.div
                                        key={d.id}
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        className="relative p-4 bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100/50 dark:border-gray-800/50 rounded-2xl flex flex-col gap-3 group"
                                    >
                                        <div className="flex gap-3 items-start">
                                            {/* File Type Icon */}
                                            <div className="shrink-0 p-2 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl font-black text-[10px] flex items-center justify-center w-9 h-9 border border-red-100 dark:border-red-900/30">
                                                PDF
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black text-gray-950 dark:text-white truncate" title={d.filename}>
                                                    {d.filename}
                                                </p>
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-0.5">
                                                    {d.status === "connecting" && "Connecting..."}
                                                    {d.status === "downloading" &&
                                                        `${d.loaded} of ${d.total} • ${d.speed}`}
                                                    {d.status === "completed" && "Download Complete"}
                                                    {d.status === "error" && "Download Failed"}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="shrink-0 flex items-center">
                                                {d.status === "downloading" || d.status === "connecting" ? (
                                                    <button
                                                        onClick={() => cancelDownload(d.id)}
                                                        title="Cancel"
                                                        className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <line x1="18" y1="6" x2="6" y2="18" />
                                                            <line x1="6" y1="6" x2="18" y2="18" />
                                                        </svg>
                                                    </button>
                                                ) : d.status === "completed" ? (
                                                    <div className="flex items-center gap-1">
                                                        {d.blobUrl && (
                                                            <a
                                                                href={d.blobUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="Open Document"
                                                                className="p-1 text-blue-500 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-850 transition-all"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                                    <polyline points="15 3 21 3 21 9" />
                                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                        <button
                                                            onClick={() => removeDownload(d.id)}
                                                            title="Dismiss"
                                                            className="p-1 text-gray-450 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                                <line x1="6" y1="6" x2="18" y2="18" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => retryDownload(d.url, d.filename, d.id)}
                                                            title="Retry"
                                                            className="p-1 text-blue-500 hover:text-blue-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => removeDownload(d.id)}
                                                            title="Dismiss"
                                                            className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                                <line x1="6" y1="6" x2="18" y2="18" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        {(d.status === "downloading" || d.status === "connecting" || d.status === "completed") && (
                                            <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-blue-600 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${d.progress}%` }}
                                                    transition={{ duration: 0.1 }}
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
