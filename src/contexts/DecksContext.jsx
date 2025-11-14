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
/*    const fetchDecks = async() => {

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
    }*/

        // DecksContext.jsx
const fetchDecks = async (sortOrder = "updatedAt-desc") => {
  setLoading(true);
  try {
    const response = await api.get(`/decks`);
    let data = response.data.decks;

    // tri avant setDecks
    const [field, order] = sortOrder.split("-");
    data = data.sort((a, b) =>
      order === "asc"
        ? new Date(a[field]) - new Date(b[field])
        : new Date(b[field]) - new Date(a[field])
    );

    setDecks(data);
  } catch (error) {
    if (handle401(error, navigate)) return;
    else {
      console.error("Erreur lors de la récupération des présentations", error);
    }
  } finally {
    setLoading(false);
  }
};


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