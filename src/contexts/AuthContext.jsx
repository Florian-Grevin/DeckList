import api from '../api'
import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const validateToken = async () => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
            const response = await api.get('/auth/me')
                setUser(response.data.user);
                setToken(storedToken);
            }
            catch {
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
                navigate("/login");
            };
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            await validateToken();
            setLoading(false);
        };
        checkAuth();
    }, []);




    const register = async (name, email, password) =>  {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const {token : newToken, user : newUser } = response.data;
            localStorage.setItem("token", newToken);
            setUser(newUser);
            setToken(newToken);
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error.response?.data?.
            message || 'Une erreur est survenue'};
        }
    };

    const login = async (email, password) =>  {
        try {
            const response = await api.post('auth/login', { email, password });
            const {token : newToken, user : newUser } = response.data;

            localStorage.setItem("token", newToken);

            setUser(newUser);
            setToken(newToken);
            return { success: true};
        }
        catch (error) {
            return { success: false, error: error.response?.data?.
            message || 'Une erreur est survenue'};
        }
    };

    const isAuthenticated = () => {
        return !!token; // !! Pour convertir en boolean
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
};