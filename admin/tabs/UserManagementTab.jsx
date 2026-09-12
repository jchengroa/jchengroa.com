import React, { useState } from 'react';
import { pb } from '../adminPocketBase.js';

export default function UserManagementTab({ session, onSignOut, onShowToast }) {
    const user = session?.record || session?.model || pb.authStore.record || pb.authStore.model || {};
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updatingPassword, setUpdatingPassword] = useState(false);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            if (onShowToast) onShowToast('error', 'Password must be at least 8 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            if (onShowToast) onShowToast('error', 'Passwords do not match.');
            return;
        }

        setUpdatingPassword(true);
        try {
            const currentId = user.id || pb.authStore.record?.id || pb.authStore.model?.id;
            if (!currentId) throw new Error('No active admin session found.');

            await pb.collection('_superusers').update(currentId, {
                password: newPassword,
                passwordConfirm: confirmPassword
            });
            if (onShowToast) onShowToast('success', 'Admin password updated successfully!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            if (onShowToast) onShowToast('error', `Password update failed: ${err.message}`);
        } finally {
            setUpdatingPassword(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Account Info Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                                Current Admin Session
                            </h2>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                Authenticated
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Authenticated Admin Session
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onSignOut}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 transition-colors self-start sm:self-center"
                    >
                        Sign Out of Admin
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">Email</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white font-mono break-all">{user.email || 'N/A'}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">Admin ID</span>
                        <span className="text-[11px] font-mono text-gray-500 break-all">{user.id || 'N/A'}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">Status</span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Superuser Active</span>
                    </div>
                </div>
            </div>

            {/* Security Actions */}
            <div className="max-w-xl">
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                        <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                            Update Admin Password
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Set a new secure password for your admin account.
                        </p>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-3.5">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                New Password (min 8 chars)
                            </label>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={updatingPassword}
                            className="w-full py-2.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {updatingPassword && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                            <span>{updatingPassword ? 'Updating Password...' : 'Save New Password'}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
