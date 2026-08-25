import { useState, useCallback } from "react";
import { HexColorPicker } from 'react-colorful';
import { ToggleSwitch } from "./toggleSwitch.jsx";

export const ACCENT_COLORS = [
    { id: 'red', name: 'Red', hex: '#dc2626' },
    { id: 'orange', name: 'Orange', hex: '#ea580c' },
    { id: 'yellow', name: 'Yellow', hex: '#eab308' },
    { id: 'green', name: 'Green', hex: '#16a34a' },
    { id: 'blue', name: 'Blue', hex: '#2563eb' },
    { id: 'violet', name: 'Violet', hex: '#7c3aed' },
    { id: 'monochrome', name: 'Monochrome', hex: '#737373' },
];

export default function AppearanceSettings({ 
    themeMode, 
    setThemeMode, 
    accentColor, 
    setAccentColor, 
    customHex, 
    setCustomHex, 
    docsTabs, 
    setDocsTabs, 
    heroParticles, 
    setHeroParticles 
}) {
    const [pickerOpen, setPickerOpen] = useState(false);
    const [tempHex, setTempHex] = useState(customHex || '#2563eb');

    const isCustom = accentColor === 'custom';
    const currentHex = isCustom && customHex ? customHex : ACCENT_COLORS.find(c => c.id === accentColor)?.hex || '#2563eb';

    const handlePresetClick = (colorId) => {
        setAccentColor(colorId);
        setPickerOpen(false);
    };

    const handlePickerOpen = () => {
        setTempHex(customHex || '#2563eb');
        setPickerOpen(true);
    };

    const handlePickerChange = useCallback((hex) => {
        setTempHex(hex);
    }, []);

    const handleApply = () => {
        setCustomHex(tempHex);
        setAccentColor('custom');
        setPickerOpen(false);
    };

    return (
        <div className="space-y-10">
            {/* Theme Mode Selector */}
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Theme Mode
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-1.5 flex flex-col sm:flex-row gap-1">
                    {['light', 'dark', 'auto'].map((mode) => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => setThemeMode(mode)}
                            className={`flex-1 min-w-0 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${themeMode === mode ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium mt-3 leading-relaxed">
                    Light uses a bright interface, Dark is easier on the eyes in low light, and Auto follows your system preference.
                </p>
            </div>

            {/* Accent Color Palette */}
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Accent Color
                </h3>
                <div className="flex gap-3 items-center flex-wrap">
                    {ACCENT_COLORS.map((color) => (
                        <button
                            key={color.id}
                            type="button"
                            onClick={() => handlePresetClick(color.id)}
                            title={color.name}
                            className={`w-10 h-10 rounded-full transition-all ${accentColor === color.id ? 'scale-125 ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-lg' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                            style={color.id === 'monochrome' ? { background: 'linear-gradient(135deg, #171717 50%, #f5f5f5 50%)', border: '1px solid #e5e7eb' } : { backgroundColor: color.hex }}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={handlePickerOpen}
                        title="Custom color"
                        className={`w-10 h-10 rounded-full border-2 border-dashed transition-all flex items-center justify-center ${isCustom ? 'scale-125 ring-2 ring-gray-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-lg border-gray-900 dark:border-white' : 'border-gray-300 dark:border-gray-600 hover:scale-110 hover:border-gray-400 dark:hover:border-gray-500'}`}
                        style={isCustom ? { backgroundColor: currentHex } : { backgroundColor: 'transparent' }}
                    >
                        {!isCustom && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500"><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>
                        )}
                    </button>
                </div>
                {isCustom && customHex && (
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">{customHex}</span>
                    </div>
                )}
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium mt-3 leading-relaxed">
                    Choose a preset or pick your own custom color.
                </p>
            </div>

            {/* Layout & Animation Toggles */}
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Layout & Animation Settings
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div className="flex-1 pr-4 text-left">
                            <p className="text-gray-900 dark:text-white font-bold text-sm">Hero Physics Particles</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5 leading-relaxed">Enable interactive ambient background particles and physics in the hero section.</p>
                        </div>
                        <ToggleSwitch enabled={heroParticles} onChange={setHeroParticles} label="Toggle Hero Physics Particles" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div className="flex-1 pr-4 text-left">
                            <p className="text-gray-900 dark:text-white font-bold text-sm">Quick Nav Outline</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5 leading-relaxed">Show or hide the quick navigation outline sidebar on pages.</p>
                        </div>
                        <ToggleSwitch enabled={docsTabs} onChange={setDocsTabs} label="Toggle Quick Nav Outline" />
                    </div>
                </div>
            </div>

            {/* Custom Color Picker Card */}
            {pickerOpen && (
                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
                            Custom Color
                        </h4>
                        <button
                            type="button"
                            onClick={handleApply}
                            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black rounded-xl hover:opacity-80 transition-all"
                        >
                            Apply Color
                        </button>
                    </div>
                    <div className="flex justify-center mb-4">
                        <HexColorPicker color={tempHex} onChange={handlePickerChange} style={{ width: '100%', maxWidth: 200 }} />
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                        <div className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm" style={{ backgroundColor: tempHex }} />
                        <input
                            type="text"
                            value={tempHex}
                            onChange={(e) => {
                                let v = e.target.value;
                                if (!v.startsWith('#')) v = '#' + v;
                                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                                    setTempHex(v);
                                }
                            }}
                            className="w-full max-w-[8rem] text-center text-sm font-bold font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-1.5 px-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                            placeholder="#2563eb"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                        {['#dc2626', '#ea580c', '#eab308', '#16a34a', '#2563eb', '#7c3aed', '#ec4899', '#06b6d4', '#14b8a6', '#84cc16'].map((hex) => (
                            <button
                                key={hex}
                                type="button"
                                onClick={() => setTempHex(hex)}
                                className={`w-6 h-6 rounded-full transition-all hover:scale-125 ${tempHex === hex ? 'ring-2 ring-gray-900 dark:ring-white ring-offset-1' : ''}`}
                                style={{ backgroundColor: hex }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export { AppearanceSettings };
