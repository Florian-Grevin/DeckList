import { useNavigate } from "react-router-dom";
import SlideFrame from "./SlideFrame";



export default function DeckList({ decks, removeDeck, loading, editForm, fetchFirstSlide, firstSlides }) {
    const navigate = useNavigate();

    const handleEdit = (deck) => {
        editForm(deck)
    }

    const handleRemove = (id) => {
        removeDeck(id);
    }

    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diffMs = now - past;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffWeek = Math.floor(diffDay / 7);
        const diffMonth = Math.floor(diffDay / 30);
        const diffYear = Math.floor(diffDay / 365);

        if (diffSec < 60) return `il y a ${diffSec} sec`;
        if (diffMin < 60) return `il y a ${diffMin} min`;
        if (diffHour < 24) return `il y a ${diffHour} h`;
        if (diffDay < 7) return `il y a ${diffDay} j`;
        if (diffWeek < 4) return `il y a ${diffWeek} sem`;
        if (diffMonth < 12) return `il y a ${diffMonth} mois`;
        return `il y a ${diffYear} an${diffYear > 1 ? "s" : ""}`;
    }

    const DeckCard = ({ deck }) => {
        const handleClick = () => {
            navigate(`/decks/${deck.id}`);
        };

        const previewSlide = firstSlides[deck.id];

        return (
            <div
                className={`
            flex flex-col justify-between items-center transform hover:scale-105 w-xs
            transition duration-300 border-3 border-[#0093b8] rounded-lg shadow-md p-2 mt-4 cursor-pointer
        `}
                style={{
                    backgroundColor: `var(--${deck.theme}_primary)`,
                    color: `var(--${deck.theme}_secondary)`,
                    aspectRatio: "16/9"
                }}
                onClick={() => handleClick(deck)} // Appeler handleClick() pour la div
            >
                <div
                    className="hover:cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation de l'événement vers la div principale
                        handleClick(deck); // Gère le clic uniquement sur cette zone spécifique
                    }}
                >
                    <p className="font-bold text-2xl text-center">{deck.title}</p>
                </div>
                <div>
                    {previewSlide && (
                        <SlideFrame
                            slide={previewSlide}
                            ratio={deck.ratio}
                            width="200px"
                            borderColor={`var(--${deck.theme}_secondary)`}
                        />
                    )}
                </div>

                <div className="flex justify-between w-full">

                    <div className="flex gap-1 items-center">
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Empêche la propagation de l'événement vers la div principale
                                handleEdit(deck);
                            }}
                            className="hover:cursor-pointer hover:bg-amber-500 p-1 rounded-md"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Empêche la propagation de l'événement vers la div principale
                                handleRemove(deck.id);
                            }}
                            className="hover:cursor-pointer hover:bg-amber-500 p-1 rounded-md"
                        >
                            🗑️
                        </button>
                    </div>

                    <div className="">
                        <p className="text-xs">
                            <span className="font-semibold text-xs italic">Crée:</span> {timeAgo(deck.createdAt)}
                        </p>
                        <p className="text-xs">
                            <span className="font-semibold text-xs italic">Modifié:</span> {timeAgo(deck.updatedAt)}
                        </p>
                    </div>

                </div>

            </div>
        );
    };


    if (loading) {
        return (
            <div className="">
                <div className="text-white p-4">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="">
            <h2 className="text-center max-w-8xl font-bold text-2xl" >Vos Présentations</h2>



            <div className="flex flex-wrap gap-4 max-w-[2000px] m-auto justify-center">
                {decks.length == 0 && <p className="text-neutral-400 italic m-4">Vous n'avez pas encore de présentation</p>}
                {decks.map((deck) => (
                    <DeckCard key={deck.id} deck={deck} />
                ))}
            </div>

        </div>
    )
}