import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext';

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
            email: '',
            password: '',
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const {showSuccess, showError} = useNotification();
    const { login, token, user } = useAuth();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const result = await login(formData.email, formData.password)
            if(result.success) {
                showSuccess(`Connexion réussie!`)
                navigate("/decks")
            }
            else {
                showError(result.error)
                setError(result.error)
            }
        }
        catch (error) {
            console.error('Erreur lors de la tentative de connexion :', error)
            showError("Impossible de communiquer avec le serveur. Veuillez réessayer plus tard.")
            setError("Erreur réseau ou serveur.")
        }

        setLoading(false)
    }

    return (
       
        <div className="min-h-screen flex items-center
        justify-center bg-[#1C3238]">
            <div className="max-w-md w-full bg-[#0093B8] p-8 rounded-lg
            shadow-md">
               <h2 className="text-3xl font-bold text-center 
               text-white mb-8">
                    Connexion
               </h2>

               

               <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-100 mb-2"
                    >
                    Email
                    </label> 
                     <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none
                        focus:ring-2 focus:ring-gray-500"
                        placeholder="E-mail"
                    />

                </div>
                <div>
                    <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-100 mb-2"
                    >
                    Mot de passe
                    </label> 
                     <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none
                        focus:ring-2 focus:ring-gray-500"
                        placeholder="Password"
                    />

                </div>
                <button 
                    type="submit"
                    className="w-full bg-yellow-600 text-gray-100 py-2 px-4 rounded-md hover:bg-[#B87400]
                    focus:outline-none focus:ring-2 focus:ring-[#B87400] focus:ring-offset-2 disabled:opacity-50
                    disabled:cursor-not-allowed"
                >
                    Connexion
                </button>
               </form>
               <p className="mt-4 text-center text-sm text-gray-100">Vous n'avez pas de compte? <Link to="/register" className="text-yellow-600 hover:text-yellow-700
               font-medium">Inscription</Link>
               </p>
            </div>
        </div>
    )
};