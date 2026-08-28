import React, { useState } from 'react';
import { supabase } from '../adminSupabase.js';

export default function AdminLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [magicLinkSent, setMagicLinkSent] = useState(false);
    const [loginMode, setLoginMode] = useState('password'); // 'password' | 'magic_link'

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);

        if (!supabase) {
            setErrorMsg('Supabase client not configured. Check environment variables.');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password
            });

            if (error) throw error;
            if (data.session) {
                onLoginSuccess(data.session);
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrorMsg(err.message || 'Invalid login credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleMagicLink = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email.trim(),
                options: {
                    emailRedirectTo: window.location.href,
                }
            });

            if (error) throw error;
            setMagicLinkSent(true);
        } catch (err) {
            setErrorMsg(err.message || 'Failed to send magic link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center p-4 sm:p-6 transition-colors duration-300">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Branding Header (No "A" Logo) */}
                <div className="text-center mb-8 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-1">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        Control Portal
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                        jchengroa Admin
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Authenticate with your admin account to manage website content and settings.
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-gray-200/80 dark:border-gray-800 shadow-2xl shadow-blue-900/5 space-y-6">
                    {errorMsg && (
                        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-start gap-2.5">
                            <span className="text-sm">⚠️</span>
                            <div className="flex-1 leading-snug">{errorMsg}</div>
                        </div>
                    )}

                    {magicLinkSent ? (
                        <div className="text-center py-6 space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-xl">
                                ✉️
                            </div>
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                                Magic Link Dispatched!
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                We sent a sign-in link to <strong className="text-gray-800 dark:text-gray-200">{email}</strong>. Check your inbox and click the link to log in.
                            </p>
                            <button
                                type="button"
                                onClick={() => setMagicLinkSent(false)}
                                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2"
                            >
                                Back to Password Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={loginMode === 'password' ? handlePasswordLogin : handleMagicLink} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@jchengroa.com"
                                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                />
                            </div>

                            {loginMode === 'password' && (
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-600/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                            >
                                {loading && (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                )}
                                <span>
                                    {loading ? 'Authenticating...' : loginMode === 'password' ? 'Sign In to Dashboard' : 'Send Magic Link'}
                                </span>
                            </button>

                            <div className="pt-2 text-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setErrorMsg(null);
                                        setLoginMode(loginMode === 'password' ? 'magic_link' : 'password');
                                    }}
                                    className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {loginMode === 'password' ? 'Prefer passwordless? Use Magic Link' : 'Use Password Sign In instead'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="text-center mt-6">
                    <p className="text-[11px] text-gray-400 dark:text-gray-600 font-medium">
                        jchengroa.com • Protected by Supabase Auth
                    </p>
                </div>
            </div>
        </div>
    );
}
