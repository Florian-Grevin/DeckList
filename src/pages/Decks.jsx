import Navbar from "../components/Navbar";
import DeckList from "../components/DeckList.jsx";
import { handle401 } from "../assets/utils/authUtils";
import DeckForm from "../components/DeckForm.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

import { useNotification } from "../contexts/NotificationContext.jsx";
import { useState, useEffect } from "react";
import { useRef } from "react";

import { useDecks } from "../contexts/DecksContext.jsx";

export default function Decks() {

    const selectRef = useRef(null);

    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();
    const [editingDeck, setEditingDeck] = useState(null);
    const [firstSlides, setFirstSlides] = useState({});
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);


    const { decks, setDecks, fetchDecks } = useDecks();


    const openForm = () => {
        setEditingDeck(null);
        setIsModalOpen(true);
    }

    const closeForm = () => {
        setIsModalOpen(false);
    }

    const handleEdit = (deck) => {
        setEditingDeck(deck);
        setIsModalOpen(true);
    }
    
    useEffect(() => {
        if (decks.length > 0) {
            decks.forEach(deck => {
                if (deck.slides.length > 0) {
                    fetchFirstSlide(deck.id);
                }
            });
        }
    }, [decks]);

    //Decks
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

    const removeDeck = async (id) => {
        setLoading(true);
        try {
            const response = await api.delete(`/decks/${id}`);
            const data = response.data;
            showSuccess(data.message)
            fetchDecks();
        }
        catch (error) {
            console.log(error)
            if (handle401(error, navigate)) return;
            else {
                showError(error?.message || "Erreur lors de la suppression d'une présentation");
            }
        }
        finally {
            setLoading(false);
        }
    }

    const handleSortDecks = (e) => {
        const sortingDecks = e.target.value.split("-");
        sortDecks(sortingDecks[0], sortingDecks[1]);
    }

    const sortDecks = (createdUpdated = "createdAt", isAsc = "asc") => {
        console.log(createdUpdated)
        console.log(isAsc)
        const sorted = [...decks].sort((a, b) =>
            isAsc === "asc"
                ? new Date(a[createdUpdated]) - new Date(b[createdUpdated])
                : new Date(b[createdUpdated]) - new Date(a[createdUpdated])
        );
        setDecks(sorted);
    };

    //Slide
    const fetchFirstSlide = async (deckId) => {
        setLoading(true);
        try {
            const response = await api.get(`/decks/${deckId}/slides`);
            const data = response.data.slides[0];
            setFirstSlides(prev => ({ ...prev, [deckId]: data }));
        }
        catch (error) {
            if (handle401(error, navigate)) return;
            else {
                showError("Erreur lors de la récupération du 1er slide");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center gap-2">
                <select ref={selectRef} onChange={handleSortDecks} className="font-semibold" name="sortOrder" id="sortOrder" defaultValue="updatedAt-desc">
                    <option className="font-semibold" value="createdAt-desc">📅 Créations les plus récentes</option>
                    <option className="font-semibold" value="createdAt-asc">📅 Créations les plus anciennes</option>
                    <option className="font-semibold" value="updatedAt-desc">📅 Mise à jour les plus récentes</option>
                    <option className="font-semibold" value="updatedAt-asc">📅 Mise à jour les plus anciennes</option>
                </select>

                <button onClick={openForm} className="bg-amber-500 text-white font-bold p-2 m-4 rounded-lg cursor-pointer">Créer Présentation</button>
            </div>
            {isModalOpen && <DeckForm addDeck={addDeck} deck={editingDeck} closeForm={closeForm} />}

            <DeckList decks={decks} removeDeck={removeDeck} loading={loading} editForm={handleEdit} firstSlides={firstSlides} />
        </>
    )
}