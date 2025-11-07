import { useEffect } from "react";

export default function Toast({message, type = 'info', onClose, duration = 3000, style=""}) {
    useEffect(() => {
        if(duration && onClose) {
            const timer = setTimeout(() => {
                onClose();
            },duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    
    const styles = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    }

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
    }

    return (
        <div className={`fixed top-4 right-4 z-50 min-w-80 max-w-md border px-4 py-3 rounded shadow-lg flex items-start justify-between ${styles[type]}`} style={style}>
        <div className={`flex items-start gap-3`}>
            <span className="text-xl font-bold">{icons[type]}</span>
            <p className="flex-1">{message}</p>
        </div>
        {onClose && (
            <button
            onClick={onClose}
            className="ml-4 text-xl font-bold opacity-70 hover:opacity-100"
            >
            ×
            </button>
        )}
        </div>
    );
}