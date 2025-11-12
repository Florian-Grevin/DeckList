import api from '../api'
import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const DecksContext = createContext(null);

export const DecksProvider = ({ children }) => {
    
    const [decks, setDecks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        fetchDecks();
    }, []);

    //Decks
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

    const value = {
        decks,
        setDecks,
        fetchDecks,
    };

    return <DecksContext.Provider value={value}>{children}</DecksContext.Provider>;
};

export const useDecks = () => {
    const context = useContext(DecksContext);
    if(!context) {
        throw new Error("useDecks doit être utilisé à l'intérieur d'un DecksProvider");
    }
    return context;
};