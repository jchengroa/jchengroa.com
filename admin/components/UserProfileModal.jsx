import React, { useState, useEffect } from 'react';
import { supabase } from '../adminSupabase.js';

export default function UserProfileModal({ isOpen, onClose, session, onShowToast, onSignOut, onUserUpdated }) {
    const user = session?.user || {};
    const metadata = user.user_metadata || {};

    const [displayName, setDisplayName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [savingProfile, setSavingProfile] = useState(false);
    const [savingSecurity, setSavingSecurity] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security' | 'session'

    useEffect(() => {
        if (isOpen && session?.user) {
            setDisplayName(metadata.display_name || metadata.full_name || user.email?.split('@')[0] || 'John Carlo Cheng Roa');
            setAvatarUrl(metadata.avatar_url || '');
            setPhone(metadata.phone || user.phone || '');
            setEmail(user.email || '');
            setNewPassword('');
            setConfirmPassword('');
        }
    }, [isOpen, session]);

    if (!isOpen) return null;

    // 1. Update Profile Metadata (Display Name, Avatar URL, Phone)
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSavingProfile(true);

        try {
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    display_name: displayName.trim(),
                    full_name: displayName.trim(),
                    avatar_url: avatarUrl.trim(),
                    phone: phone.trim()
                }
            });

            if (error) throw error;
            if (onUserUpdated && data.user) {
                onUserUpdated(data.user);
            }
            if (onShowToast) onShowToast('success', 'Profile display name and details updated!');
        } catch (err) {
            if (onShowToast) onShowToast('error', `Failed to update profile: ${err.message}`);
        } finally {
            setSavingProfile(false);
        }
    };

    // 2. Update Email & Password (Credentials)
    const handleUpdateSecurity = async (e) => {
        e.preventDefault();
        setSavingSecurity(true);

        try {
            const updates = {};
            if (email.trim() && email.trim() !== user.email) {
                updates.email = email.trim();
            }

            if (newPassword.trim()) {
                if (newPassword.length < 6) {
                    throw new Error('New password must be at least 6 characters long.');
                }
                if (newPassword !== confirmPassword) {
                    throw new Error('Passwords do not match.');
                }
                updates.password = newPassword;
            }

            if (Object.keys(updates).length === 0) {
                if (onShowToast) onShowToast('info', 'No security credentials were changed.');
                setSavingSecurity(false);
                return;
            }

            const { data, error } = await supabase.auth.updateUser(updates);
            if (error) throw error;

            if (onUserUpdated && data.user) {
                onUserUpdated(data.user);
            }

            if (onShowToast) onShowToast('success', 'Security credentials updated successfully!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            if (onShowToast) onShowToast('error', err.message);
        } finally {
            setSavingSecurity(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-5">
                    <div className="flex items-center gap-3.5">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white dark:border-gray-800 shadow-md flex items-center justify-center text-white font-black text-xl">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={displayName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    (displayName || 'A').charAt(0).toUpperCase()
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                                {displayName || 'Admin Account'}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate max-w-[200px]">
                                    {user.email}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                    Admin
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                {/* Sub-tab Navigation */}
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl gap-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab('profile')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                            activeTab === 'profile'
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                        👤 Profile & Avatar
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('security')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                            activeTab === 'security'
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                        🔒 Security & Auth
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('session')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                            activeTab === 'session'
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                        ℹ️ Session Details
                    </button>
                </div>

                {/* TAB 1: Profile & Avatar Details */}
                {activeTab === 'profile' && (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                                Display Name / Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="John Carlo Cheng Roa"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                                Profile / Display Picture URL
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    placeholder="https://... image link or /logo.png"
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {avatarUrl && (
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                                        <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                                Contact Phone Number (Optional)
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+63 900 000 0000"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                disabled={savingProfile}
                                className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2"
                            >
                                {savingProfile && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                <span>{savingProfile ? 'Saving Profile...' : 'Save Profile Changes'}</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* TAB 2: Security & Credentials */}
                {activeTab === 'security' && (
                    <form onSubmit={handleUpdateSecurity} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                                Admin Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <p className="text-[10px] text-gray-400 mt-1">
                                Updating email will dispatch a Supabase confirmation message.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                                    New Password (Optional)
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Leave blank to keep current"
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                disabled={savingSecurity}
                                className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2"
                            >
                                {savingSecurity && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                <span>{savingSecurity ? 'Updating Credentials...' : 'Update Security'}</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* TAB 3: Session Details & Sign Out */}
                {activeTab === 'session' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">User ID</span>
                                <div className="font-mono text-gray-800 dark:text-gray-200 text-[11px] break-all">{user.id}</div>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Role</span>
                                <div className="font-bold text-blue-600 dark:text-blue-400 capitalize">{user.role || 'authenticated'}</div>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Account Created</span>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">{user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}</div>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Last Sign In</span>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</div>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={onSignOut}
                                className="px-5 py-2.5 rounded-2xl text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-100 transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                <span>Sign Out of Admin</span>
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
