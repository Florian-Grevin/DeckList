import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function User() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">👤 Profil utilisateur</h2>

        {user ? (
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Nom :</span> {user.name}</p>
            <p><span className="font-semibold">Email :</span> {user.email}</p>
            <p><span className="font-semibold">ID :</span> {user.id}</p>
          </div>
        ) : (
          <p className="text-red-500">Aucun utilisateur connecté.</p>
        )}
      </div>
    </>
  );
}
