import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const {isAuthenticated,loading}=useAuth();
    if (loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Chargement...</div>
            </div>
        );
    }
    if (!isAuthenticated){ // A améliorer pour etre sur de pas acceder a des présentations d'autres users
        return <Navigate to="/login" replace />
    }
    return children
}
