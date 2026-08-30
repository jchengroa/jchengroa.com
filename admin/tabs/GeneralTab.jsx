import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { 
    LuGlobe, 
    LuSparkles, 
    LuPowerOff, 
    LuSun, 
    LuMoon, 
    LuMonitor, 
    LuPalette, 
    LuCircleCheck,
    LuRefreshCw
} from 'react-icons/lu';
import { ToggleTile } from '../components/ToggleTile.jsx';

const PRESET_ACCENTS = [
    { id: 'red', name: 'Red', hex: '#dc2626' },
    { id: 'orange', name: 'Orange', hex: '#ea580c' },
    { id: 'yellow', name: 'Yellow', hex: '#eab308' },
    { id: 'green', name: 'Green', hex: '#16a34a' },
    { id: 'blue', name: 'Blue', hex: '#2563eb' },
    { id: 'violet', name: 'Violet', hex: '#7c3aed' },
    { id: 'monochrome', name: 'Monochrome', hex: '#737373' },
];

export default function GeneralTab({
    siteActiveStatus,
    setSiteActiveStatus,
    defaultThemeMode,
    setDefaultThemeMode,
    defaultAccentColor,
    setDefaultAccentColor,
    customAccentHex,
    setCustomAccentHex,
    isSyncing = false,
    lastCheckedTime = null,
    onManualRefresh
}) {
    const [showColorPicker, setShowColorPicker] = useState(false);

    return (
        <div className="space-y-8">
            {/* SECTION 1: Site Active Status Switch (Auto-Saved to Supabase Instantly) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                                Website Availability Status
                            </h2>
                            <code className="text-[11px] font-mono bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                                key: site_active
                            </code>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Live master switch. Changing availability saves immediately to the database without requiring manual save.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Instant Cloud Save</span>
                        </span>

                        {onManualRefresh && (
                            <button
                                type="button"
                                onClick={onManualRefresh}
                                title="Check latest cloud status"
                                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors"
                            >
                                <LuRefreshCw size={14} className={isSyncing ? "animate-spin text-blue-600" : ""} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Status Toggle Tiles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* 1. Active / Online */}
                    <ToggleTile
                        icon={LuGlobe}
                        title="Active / Online"
                        subtitle="Public visitors have full access to all portfolio pages & projects"
                        enabled={siteActiveStatus === 'active'}
                        activeColor="emerald"
                        statusText={siteActiveStatus === 'active' ? 'Live Now' : 'Click to Activate'}
                        onToggle={() => setSiteActiveStatus('active')}
                    />

                    {/* 2. Dev Mode */}
                    <ToggleTile
                        icon={LuSparkles}
                        title="Dev / Updating"
                        subtitle='Visitors see the modern "Website Currently Being Updated" overlay'
                        enabled={siteActiveStatus === 'dev'}
                        activeColor="amber"
                        statusText={siteActiveStatus === 'dev' ? 'Updating Live' : 'Click for Dev'}
                        onToggle={() => setSiteActiveStatus('dev')}
                    />

                    {/* 3. Offline / Maintenance */}
                    <ToggleTile
                        icon={LuPowerOff}
                        title="Offline / Maintenance"
                        subtitle="Disables public access with standard maintenance notice"
                        enabled={siteActiveStatus === 'offline'}
                        activeColor="rose"
                        statusText={siteActiveStatus === 'offline' ? 'Offline Live' : 'Click for Offline'}
                        onToggle={() => setSiteActiveStatus('offline')}
                    />
                </div>
            </div>

            {/* SECTION 2: Default Theme Mode */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-6">
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
                        The default visual appearance served to first-time visitors before local preferences are saved.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <ToggleTile
                        icon={LuSun}
                        title="Light Theme"
                        subtitle="Crisp, high-contrast bright interface"
                        enabled={defaultThemeMode === 'light'}
                        activeColor="amber"
                        statusText={defaultThemeMode === 'light' ? 'Default Mode' : 'Set Default'}
                        onToggle={() => setDefaultThemeMode('light')}
                    />

                    <ToggleTile
                        icon={LuMoon}
                        title="Dark Theme"
                        subtitle="Sleek, low-light modern aesthetic"
                        enabled={defaultThemeMode === 'dark'}
                        activeColor="indigo"
                        statusText={defaultThemeMode === 'dark' ? 'Default Mode' : 'Set Default'}
                        onToggle={() => setDefaultThemeMode('dark')}
                    />

                    <ToggleTile
                        icon={LuMonitor}
                        title="System / Auto"
                        subtitle="Automatically adapts to visitor device preference"
                        enabled={defaultThemeMode === 'auto'}
                        activeColor="blue"
                        statusText={defaultThemeMode === 'auto' ? 'Default Mode' : 'Set Default'}
                        onToggle={() => setDefaultThemeMode('auto')}
                    />
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
                    <div className="flex flex-wrap gap-2.5 items-center">
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
                                    className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                                        isSelected
                                            ? 'border-gray-900 dark:border-white bg-white dark:bg-gray-800 shadow-md ring-2 ring-blue-500/20 scale-105 font-black'
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
                            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                                defaultAccentColor === 'custom'
                                    ? 'border-gray-900 dark:border-white bg-white dark:bg-gray-800 shadow-md ring-2 ring-blue-500/20 scale-105 font-black'
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
                                className="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
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
                                        className={`w-6 h-6 rounded-full transition-transform hover:scale-125 cursor-pointer ${
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
