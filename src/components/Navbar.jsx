import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
    const { logout, user, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    if (loading) {
        return (
            <nav className="bg-[#0093B8] shadow-sm">
                <div className="text-white italic p-4">Chargement...</div>
            </nav>
        );
    }

    return (
        <nav className="bg-[#0093B8] shadow-sm">
            <div className="max-w-[2000px] mx-auto px-4 sm:px6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/decks">
                    <h1 className="text-white text-2xl font-bold hover:underline cursor-pointer">
                        SlideForge
                    </h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        {user?.name && (
                            <Link
                                to="/User"
                                className="cursor-pointer text-white hover:underline font-bold"
                            >
                                👤 {user.name}
                            </Link>
                        )}

                        {isAuthenticated && (
                            <button
                                className="cursor-pointer bg-[#B83800] text-white px-4 py-2 rounded-md hover:bg-[#ca3d00] font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
