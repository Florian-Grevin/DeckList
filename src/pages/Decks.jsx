import Navbar from "../components/Navbar";
import DeckList from "../components/DeckList.jsx";
import { handle401 } from "../assets/utils/authUtils";
import DeckForm from "../components/DeckForm.jsx";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

import { useNotification } from "../contexts/NotificationContext.jsx";
import { useState, useEffect } from "react";

export default function Decks() {

    const navigate = useNavigate();
    const {showSuccess, showError} = useNotification();
    const [decks, setDecks] = useState([]);
    const [editingDeck, setEditingDeck] = useState(null);
    const [loading,setLoading]=useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openForm = () => {
        setEditingDeck(null);
        setIsModalOpen(true);
    }

    const closeForm = () => {
        setIsModalOpen(false);
    }

    const handleEdit = (deck) => {
        //if(!checkForm(deck)) return;
        setEditingDeck(deck);
        setIsModalOpen(true);
    }

    useEffect(() => {
        fetchDecks();
    }, []);

    const fetchDecks = async() => {

        setLoading(true);
        try {
            const response = await api.get(`/decks`);
            const data = response.data.decks;
            setDecks(data);
        }
        catch (error) {
            if(handle401(error, navigate)) return;
            else {
                showError("Erreur lors de la récupération des présentations");
            }
        }
        finally {
        setLoading(false);
        }
    }

    const addDeck = async (formData) => {
        setLoading(true);
        try {
            let response;
            if (editingDeck) {
                response = await api.put(`/decks/${editingDeck.id}`, formData);
                showSuccess("Présentation modifiée");
            } else {
                response = await api.post(`/decks`, formData);
                showSuccess("Présentation ajoutée");
            }

            fetchDecks();
            setEditingDeck(null);
        } catch (error) {
            if (handle401(error, navigate)) return;
            else {
                showError(error?.message || "Erreur lors de l'enregistrement de la présentation");
            }
        } finally {
            setLoading(false);
            closeForm();
        }
    };


    const removeDeck = async(id) => {
        setLoading(true);
        console.log("entering removeDeck")
        try {
            const response = await api.delete(`/decks/${id}`);
            const data = response.data;
            showSuccess(data.message)
            fetchDecks()
        }
        catch (error) {
            console.log(error)
            if(handle401(error, navigate)) return;
            else {
                showError(error?.message ||"Erreur lors de la suppression d'une présentation");
            }
        }
        finally {
            setLoading(false);
        }
    }

    return(
    <>
        <Navbar />
        <select className="font-semibold" name="sortOrder" id="sortOrder">
            <option className="font-semibold"value="desc">📅 Date décroissante</option>
            <option className="font-semibold" value="asc">📅 Date croissante</option>
        </select>

        <button onClick={openForm} className="bg-amber-500 text-white font-bold p-2 m-4 rounded-lg cursor-pointer">Créer Présentation</button>
        {isModalOpen && <DeckForm addDeck={addDeck} deck={editingDeck} closeForm={closeForm}/>}

        <DeckList decks={decks} removeDeck={removeDeck} loading={loading} editForm={handleEdit} closeForm={closeForm}/>
    </>
    )
}