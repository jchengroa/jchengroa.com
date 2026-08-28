import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const PRESET_ACCENTS = [
    { id: 'red', name: 'Red', hex: '#dc2626' },
    { id: 'orange', name: 'Orange', hex: '#ea580c' },
    { id: 'yellow', name: 'Yellow', hex: '#eab308' },
    { id: 'green', name: 'Green', hex: '#16a34a' },
    { id: 'blue', name: 'Blue', hex: '#2563eb' },
    { id: 'violet', name: 'Violet', hex: '#7c3aed' },
    { id: 'monochrome', name: 'Monochrome', hex: '#737373' },
];

const THEME_OPTIONS = [
    { id: 'light', label: 'Light', desc: 'Default bright interface' },
    { id: 'dark', label: 'Dark', desc: 'Sleek low-light aesthetic' },
    { id: 'auto', label: 'Auto (System)', desc: 'Follow visitor system preference' },
];

const STATUS_OPTIONS = [
    {
        id: 'active',
        value: true,
        label: 'Active / Online',
        desc: 'Website is fully accessible to all public visitors.',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        dot: 'bg-emerald-500'
    },
    {
        id: 'dev',
        value: 'dev',
        label: 'Dev Mode',
        desc: 'Shows "Website Currently Being Updated" screen to visitors.',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        dot: 'bg-amber-500'
    },
    {
        id: 'offline',
        value: false,
        label: 'Offline / Maintenance',
        desc: 'Shows maintenance screen and disables public access.',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        dot: 'bg-rose-500'
    }
];

export default function GeneralTab({
    siteActiveStatus,
    setSiteActiveStatus,
    defaultThemeMode,
    setDefaultThemeMode,
    defaultAccentColor,
    setDefaultAccentColor,
    customAccentHex,
    setCustomAccentHex
}) {
    const [showColorPicker, setShowColorPicker] = useState(false);

    return (
        <div className="space-y-8">
            {/* SECTION 1: Site Active Status Switch */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Website Availability Status
                        </h2>
                        <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            key: site_active
                        </code>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Controls what visitors see when navigating to your portfolio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {STATUS_OPTIONS.map((status) => {
                        const isSelected = siteActiveStatus === status.id;
                        return (
                            <label
                                key={status.id}
                                className={`relative flex flex-col p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                    isSelected
                                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm'
                                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="site_active"
                                    checked={isSelected}
                                    onChange={() => setSiteActiveStatus(status.id)}
                                    className="sr-only"
                                />
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-lg border ${status.badgeColor}`}>
                                        <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                                        {status.label}
                                    </span>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 dark:border-gray-600'
                                    }`}>
                                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mt-auto">
                                    {status.desc}
                                </p>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* SECTION 2: Default Theme Mode */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Default Theme Mode
                        </h2>
                        <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            key: default_theme_mode
                        </code>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        The initial color scheme served to new visitors who haven't saved local preferences.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {THEME_OPTIONS.map((theme) => {
                        const isSelected = defaultThemeMode === theme.id;
                        return (
                            <button
                                key={theme.id}
                                type="button"
                                onClick={() => setDefaultThemeMode(theme.id)}
                                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                    isSelected
                                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm'
                                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-black text-gray-900 dark:text-white">
                                        {theme.label}
                                    </span>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 dark:border-gray-600'
                                    }`}>
                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {theme.desc}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* SECTION 3: Default Accent Color & Custom Accent Hex */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Default Accent Color & Hex
                        </h2>
                        <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            keys: default_accent_color & custom_accent_hex
                        </code>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Default brand highlight color and fallback custom hex code for new visitors.
                    </p>
                </div>

                {/* Preset swatches */}
                <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                        Preset Palette
                    </label>
                    <div className="flex flex-wrap gap-3 items-center">
                        {PRESET_ACCENTS.map((accent) => {
                            const isSelected = defaultAccentColor === accent.id;
                            return (
                                <button
                                    key={accent.id}
                                    type="button"
                                    onClick={() => {
                                        setDefaultAccentColor(accent.id);
                                        setShowColorPicker(false);
                                    }}
                                    title={accent.name}
                                    className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 transition-all ${
                                        isSelected
                                            ? 'border-gray-900 dark:border-white bg-white dark:bg-gray-800 shadow-md scale-105'
                                            : 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-gray-300 dark:hover:border-gray-700'
                                    }`}
                                >
                                    <span
                                        className="w-5 h-5 rounded-full shadow-inner flex-shrink-0"
                                        style={
                                            accent.id === 'monochrome'
                                                ? { background: 'linear-gradient(135deg, #171717 50%, #f5f5f5 50%)', border: '1px solid #d1d5db' }
                                                : { backgroundColor: accent.hex }
                                        }
                                    />
                                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                                        {accent.name}
                                    </span>
                                </button>
                            );
                        })}

                        {/* Custom Accent Choice */}
                        <button
                            type="button"
                            onClick={() => {
                                setDefaultAccentColor('custom');
                                setShowColorPicker(true);
                            }}
                            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 transition-all ${
                                defaultAccentColor === 'custom'
                                    ? 'border-gray-900 dark:border-white bg-white dark:bg-gray-800 shadow-md scale-105'
                                    : 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-gray-300 dark:hover:border-gray-700'
                            }`}
                        >
                            <span
                                className="w-5 h-5 rounded-full shadow-inner flex-shrink-0"
                                style={{ backgroundColor: customAccentHex }}
                            />
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                                Custom Hex ({customAccentHex})
                            </span>
                        </button>
                    </div>
                </div>

                {/* Hex & Color Picker Controls */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200/80 dark:border-gray-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                                Custom Accent Hex Code
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                Applied when default accent color is set to "custom".
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-9 h-9 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex-shrink-0"
                                style={{ backgroundColor: customAccentHex }}
                            />
                            <input
                                type="text"
                                value={customAccentHex}
                                onChange={(e) => {
                                    let val = e.target.value;
                                    if (!val.startsWith('#')) val = '#' + val;
                                    if (/^#[0-9a-fA-F]{0,6}$/.test(val)) {
                                        setCustomAccentHex(val);
                                    }
                                }}
                                placeholder="#2563eb"
                                className="w-32 font-mono font-bold text-sm text-center px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                className="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                            >
                                {showColorPicker ? 'Hide Picker' : 'Open Picker'}
                            </button>
                        </div>
                    </div>

                    {showColorPicker && (
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700/60 flex flex-col items-center gap-3">
                            <HexColorPicker
                                color={customAccentHex}
                                onChange={(hex) => {
                                    setCustomAccentHex(hex);
                                    setDefaultAccentColor('custom');
                                }}
                            />
                            {/* Quick Palette swatch row */}
                            <div className="flex flex-wrap gap-2 justify-center mt-2">
                                {['#dc2626', '#ea580c', '#eab308', '#16a34a', '#2563eb', '#7c3aed', '#ec4899', '#06b6d4', '#14b8a6', '#84cc16'].map((hex) => (
                                    <button
                                        key={hex}
                                        type="button"
                                        onClick={() => {
                                            setCustomAccentHex(hex);
                                            setDefaultAccentColor('custom');
                                        }}
                                        className={`w-6 h-6 rounded-full transition-transform hover:scale-125 ${
                                            customAccentHex.toLowerCase() === hex.toLowerCase()
                                                ? 'ring-2 ring-gray-900 dark:ring-white ring-offset-1'
                                                : ''
                                        }`}
                                        style={{ backgroundColor: hex }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
