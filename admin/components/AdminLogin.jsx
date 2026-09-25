import React, { useState } from 'react';
import { pb } from '../adminPocketBase.js';
import { LuEye, LuEyeOff } from 'react-icons/lu';

export default function AdminLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);

        try {
            // Attempt superuser authentication first
            let authData;
            try {
                authData = await pb.collection('_superusers').authWithPassword(email.trim(), password);
            } catch (superErr) {
                // Fallback for older/alternate PocketBase admin auth
                if (pb.admins && typeof pb.admins.authWithPassword === 'function') {
                    authData = await pb.admins.authWithPassword(email.trim(), password);
                } else {
                    throw superErr;
                }
            }

            if (authData && pb.authStore.isValid) {
                onLoginSuccess(authData);
            } else {
                throw new Error('Invalid email or password.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrorMsg(err.message || 'Invalid login credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-sm">
                {/* Brand Header with Pill */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-sm mb-3.5">
                        <span className="text-sm font-extrabold tracking-tight text-gray-900 dark:text-white">
                            jchengroa
                        </span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Control Panel
                    </h1>
                </div>

                {/* Elegant Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-7 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    {errorMsg && (
                        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-medium leading-relaxed">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@domain.com"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-gray-800 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-gray-50/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-gray-800 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer p-1 rounded-lg transition-colors"
                                >
                                    {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-1"
                        >
                            {loading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            <span>{loading ? 'Signing in...' : 'Sign in'}</span>
                        </button>
                    </form>
                </div>

                {/* Footer with website link and team credit */}
                <div className="text-center mt-5 space-y-3">
                    <div>
                        <a
                            href="/"
                            className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors inline-flex items-center gap-1"
                        >
                            <span>←</span>
                            <span>Back to website</span>
                        </a>
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-600 font-medium">
                        the jchengroa team
                    </p>
                </div>
            </div>
        </div>
    );
}
