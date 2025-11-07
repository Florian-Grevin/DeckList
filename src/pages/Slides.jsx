
import { handle401 } from "../assets/utils/authUtils";
import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";

import api from "../api.js";

import Navbar from "../components/Navbar";
import SlideList from "../components/SlideList.jsx";


import { useNotification } from "../contexts/NotificationContext.jsx";


export default function Slides() {
    const { id } = useParams();
    const [slides,setSlides]=useState([])
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate();
    const {showSuccess, showError} = useNotification();

    useEffect(() =>{
        fetchSlides();
    }, [])


    const fetchSlides = async() => {
        setLoading(true);
        try {
            const response = await api.get(`/decks/${id}/slides`);
            const data = response.data.slides;
            console.log(data)
            setSlides(data);
        }
        catch (error) {
            if(handle401(error, navigate)) return;
            else {
                showError("Erreur lors de la récupération des slides");
            }
        }
        finally {
        setLoading(false);
        }
    }
    
    const createSlide = async() => { //Ajouter un formData pour passer en paramètres
        setLoading(true);
        try {
            const response = await api.post(`/decks/${id}/slides`);
            const data = response.data.slides;
            console.log(data)
            fetchSlides()
        }
        catch (error) {
            if(handle401(error, navigate)) return;
            else {
                showError("Erreur lors de la récupération des slides");
            }
        }
        finally {
        setLoading(false);
        }
    }

    return(
    <>
        <Navbar />
        <button className="max-w-lg m-2 bg-yellow-600 text-gray-100 py-2 px-4 rounded-md hover:bg-[#B87400]
                    focus:outline-none focus:ring-2 focus:ring-[#B87400] focus:ring-offset-2 disabled:opacity-50
                    disabled:cursor-not-allowed" onClick={createSlide} >CREER SLIDE</button>
        <SlideList loading={loading} slides={slides}/>

    </>
    )
}