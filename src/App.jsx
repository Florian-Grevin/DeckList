import Login from './pages/Login'
import Register from './pages/Register'
import Decks from './pages/Decks'
import Slides from './pages/Slides'
import User from './pages/User'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { NotificationProvider } from './contexts/NotificationContext'
import { AuthProvider } from './contexts/AuthContext'
import { DecksProvider } from './contexts/DecksContext'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
        <BrowserRouter>
          <AuthProvider>
            <DecksProvider>
              <NotificationProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user" element={<ProtectedRoute><User/></ProtectedRoute>}/>
                    <Route path="/decks" element={<ProtectedRoute><Decks/></ProtectedRoute>}/>
                    <Route path="/decks/:id" element={<ProtectedRoute><Slides/></ProtectedRoute>}/>
                </Routes>
              </NotificationProvider>
              </DecksProvider>
          </AuthProvider>
        </BrowserRouter>

  )
}

export default App
