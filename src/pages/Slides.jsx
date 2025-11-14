
import { handle401 } from "../assets/utils/authUtils";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api.js";

import Navbar from "../components/Navbar";
import SlideList from "../components/SlideList.jsx";
import SlideForm from "../components/SlideForm.jsx";


import { useNotification } from "../contexts/NotificationContext.jsx";
import { useDecks } from "../contexts/DecksContext.jsx";



export default function Slides() {
    const { id } = useParams();
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlides, setEditingSlides] = useState(null);
    const navigate = useNavigate();

    const { showSuccess, showError } = useNotification();

    const { decks } = useDecks();


    const openForm = () => {
        setIsModalOpen(true);
    }

    const closeForm = () => {
        setIsModalOpen(false);
        setEditingSlides(null);
    }

    const deck = decks.find(deck => deck.id === Number(id));
    const ratio = deck?.ratio ?? 1;

    const theme = deck?.theme;

    useEffect(() => {
        if (deck) {
            fetchSlides();
        }
    }, [deck]);


    const fetchSlides = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/decks/${id}/slides`);
            const data = response.data.slides;
            setSlides(data);
        }
        catch (error) {
            if (handle401(error, navigate)) return;
            else {
                showError("Erreur lors de la récupération des slides");
            }
        }
        finally {
            setLoading(false);
        }
    }

    const createSlide = async (formData) => { //Ajouter un formData pour passer en paramètres
        setLoading(true);
        try {
            if (editingSlides) {
                const response = await api.put(`/slides/${editingSlides.id}`, formData);
                showSuccess(response.data.message)
            }
            else {
                const response = await api.post(`/decks/${id}/slides`, formData);
                showSuccess(response.data.message)
                //const data = response.data.slides;                
            }
            fetchSlides()
        }
        catch (error) {
            if (handle401(error, navigate)) return;
            else {
                showError(error?.message || "Erreur lors de la création/modification du slide");
            }
        }
        finally {
            setLoading(false);
        }
    }

    const handleRemove = async (slideId) => {
        setLoading(true);
        try {
            // 1. Supprimer le slide
            await api.delete(`/slides/${slideId}`);
            showSuccess("Slide supprimé");

            // 2. Filtrer les slides restants
            const remainingSlides = slides.filter(slide => slide.id !== slideId);

            // 3. Réorganiser les slides restants
            for (let i = 0; i < remainingSlides.length; i++) {
                await updateSlide(remainingSlides[i].id, "order", i);
            }

            // 4. Rafraîchir l'affichage
            await fetchSlides();

        } catch (error) {
            console.error("Erreur dans handleRemove:", error);
            if (handle401(error, navigate)) return;
            showError("Erreur lors de la suppression");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (slide) => {
        setEditingSlides(slide);
    };


    const updateSlide = async (slideId, key, value) => {
        setLoading(true);
        try {
            await api.put(`/slides/${slideId}`, { [key]: value });

        } catch (error) {
            console.error(error);
            if (handle401(error, navigate)) return;
            else {
                console.error(error);
                showError(error?.message || "Erreur lors de la modification de la slide");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center">
                <button className="max-w-lg m-2 bg-yellow-600 text-gray-100 py-2 px-4 rounded-md hover:bg-[#B87400]
                        focus:outline-none focus:ring-2 focus:ring-[#B87400] focus:ring-offset-2 disabled:opacity-50
                        disabled:cursor-not-allowed" onClick={openForm} >CREER SLIDE</button>                
            </div>

            {isModalOpen &&
                <SlideForm
                    createSlide={createSlide}
                    theme={theme}
                    closeForm={closeForm}
                    slides={slides}
                    editingSlide={editingSlides}
                />}

            <SlideList
                loading={loading}
                slides={slides}
                ratio={ratio}
                updateSlide={updateSlide}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                openForm={openForm}
            />

        </>
    )
}