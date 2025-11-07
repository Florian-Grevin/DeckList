import { createContext, useState, useContext } from "react";
import Toast from "../components/Toast";


const NotificationContext = createContext(null)
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])

    const addNotification = (message, type = 'info') => {
        const id = Date.now()
        setNotifications((prev) => [...prev, {id, message, type }])
    }

    const removeNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id != id)
        );
    }

    const showSuccess = (message) => addNotification(message, "success");
    const showError = (message) => addNotification(message, "error");
    const showInfo = (message) => addNotification(message, "info");
    const showWarning = (message) => addNotification(message, "warning");

    const value = {
        showSuccess,
        showError,
        showInfo,
        showWarning
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}

            <div className="fixed top-4 right-4 z-50 space-y-2">
                {notifications.map((notification, index) => (
                    <div key={notification.id}>
                        <Toast 
                        message={notification.message}
                        type={notification.type}
                        onClose={() => removeNotification(notification.id)}
                        duration={3000}
                        style={{ marginTop: index > 0 ? index*0.5 +'rem' : '0'}}
                        />
                    </div>
                ))}
            </div>

        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification doit être utilisé à l\'intérieur d\'un NotificationProvider')
    }
    return context
}