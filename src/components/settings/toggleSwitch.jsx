export default function ToggleSwitch({ enabled, onChange, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={label}
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex items-center h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <span className={`inline-block w-5 h-5 transform rounded-full bg-white dark:bg-gray-900 shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
    );
}

export { ToggleSwitch };
