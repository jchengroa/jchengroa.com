import React, { useState, useEffect } from 'react';
import { pb } from '../adminPocketBase.js';

export default function UserProfileModal({ isOpen, onClose, session, onShowToast, onSignOut, onUserUpdated }) {
    const user = session?.record || session?.model || pb.authStore.record || pb.authStore.model || {};

    const [displayName, setDisplayName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [savingProfile, setSavingProfile] = useState(false);
    const [savingSecurity, setSavingSecurity] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (isOpen) {
            const current = pb.authStore.record || pb.authStore.model || {};
            setDisplayName(current.name || current.email?.split('@')[0] || 'John Carlo Cheng Roa');
            setAvatarUrl(current.avatar || '');
            setEmail(current.email || '');
            setNewPassword('');
            setConfirmPassword('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSavingProfile(true);

        try {
            const currentId = pb.authStore.record?.id || pb.authStore.model?.id;
            if (!currentId) throw new Error('No active admin session found.');

            const updated = await pb.collection('_superusers').update(currentId, {
                name: displayName.trim()
            });

            if (onUserUpdated) {
                onUserUpdated(updated);
            }
            if (onShowToast) onShowToast('success', 'Profile updated!');
        } catch (err) {
            if (onShowToast) onShowToast('error', `Update failed: ${err.message}`);
        } finally {
            setSavingProfile(false);
        }
    };

    const handleUpdateSecurity = async (e) => {
        e.preventDefault();
        setSavingSecurity(true);

        try {
            const currentId = pb.authStore.record?.id || pb.authStore.model?.id;
            if (!currentId) throw new Error('No active admin session found.');

            if (newPassword.trim()) {
                if (newPassword.length < 8) {
                    throw new Error('New password must be at least 8 characters long.');
                }
                if (newPassword !== confirmPassword) {
                    throw new Error('Passwords do not match.');
                }
                await pb.collection('_superusers').update(currentId, {
                    password: newPassword,
                    passwordConfirm: confirmPassword
                });
                if (onShowToast) onShowToast('success', 'Password updated successfully!');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                if (onShowToast) onShowToast('info', 'No password change entered.');
            }
        } catch (err) {
            if (onShowToast) onShowToast('error', err.message);
        } finally {
            setSavingSecurity(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4 sm:space-y-5 my-auto max-h-[92vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 sm:pb-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-blue-600 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
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
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                                {displayName || 'Admin'}
                            </h3>
                            <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-mono truncate max-w-[170px] sm:max-w-[240px]">
                                {user.email || 'Admin'}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                {/* Sub-tab Navigation */}
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl gap-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab('profile')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                            activeTab === 'profile'
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                        Profile
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('security')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                            activeTab === 'security'
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                        Security
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('session')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                            activeTab === 'session'
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                        Session
                    </button>
                </div>

                {/* TAB 1: Profile */}
                {activeTab === 'profile' && (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Display Name
                            </label>
                            <input
                                type="text"
                                required
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Admin Name"
                                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Avatar URL
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    placeholder="https://... or /logo.png"
                                    className="flex-1 px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {avatarUrl && (
                                    <div className="w-9 h-9 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0 bg-gray-100 dark:bg-gray-800">
                                        <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                disabled={savingProfile}
                                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                            >
                                {savingProfile && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                <span>{savingProfile ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* TAB 2: Security */}
                {activeTab === 'security' && (
                    <form onSubmit={handleUpdateSecurity} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Admin Email
                            </label>
                            <input
                                type="email"
                                disabled
                                value={email}
                                className="w-full px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Leave blank to keep"
                                    className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                disabled={savingSecurity}
                                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                            >
                                {savingSecurity && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                <span>{savingSecurity ? 'Updating...' : 'Update Password'}</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* TAB 3: Session */}
                {activeTab === 'session' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">User ID</span>
                                <div className="font-mono text-gray-800 dark:text-gray-200 text-[11px] break-all">{user.id || 'N/A'}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Role</span>
                                <div className="font-bold text-blue-600 dark:text-blue-400 capitalize">{user.role || 'Superuser'}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Created</span>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                    {user.created ? new Date(user.created).toLocaleDateString() : (user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A')}
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Updated</span>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                    {user.updated ? new Date(user.updated).toLocaleDateString() : (user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A')}
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={onSignOut}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                <span>Sign Out</span>
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
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
