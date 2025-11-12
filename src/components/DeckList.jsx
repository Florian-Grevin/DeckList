import { useNavigate } from "react-router-dom";


export default function DeckList({decks, removeDeck, loading, editForm}) {
    const navigate = useNavigate();


    const handleEdit=(deck)=>{
        editForm(deck)
    }

    const handleRemove=(id)=>{
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

    const DeckCard = ({deck}) => {
        
        const handleClick=()=>{
            navigate(`/decks/${deck.id}`);
        }

        return (
            <div
                className={`
                    aspect-[${deck.ratio.replace(":", "/")}] flex flex-col justify-between transform hover:scale-110 
                    transition duration-300 border-3 border-[#0093b8] rounded-lg shadow-md px-8 py-4 mt-4 cursor-pointer
                    bg-[var(--${deck.theme}_primary)] text-[var(--${deck.theme}_secondary)]
                }`}
            >   <div className="hover:cursor-pointer" onClick={()=>handleClick(deck)}>
                    <p className="font-bold text-center">{deck.title}</p>
                    <p><span className="font-semibold">Thème:</span> {deck.theme}</p>
                    <p><span className="font-semibold">Ratio:</span> {deck.ratio}</p>
                    <p><span className="font-semibold">Crée:</span> {timeAgo(deck.createdAt)}</p>
                    <p><span className="font-semibold">Modifié:</span> {timeAgo(deck.updatedAt)}</p>

                    {deck.slides.length > 0
                        ? (
                            <>
                            {
                                <div className={`w-[200px] aspect-[${deck.ratio.replace(":", "/")}] bg-red-400 border-3 border-[var(--${deck.theme}_secondary)] flex items-center justify-center text-white`}>
                                    <p>{deck.slides[0].title}</p>
                                </div>
                            
                            }
                            </>
                        )
                        : <span className="font-semibold">Aucune Slide</span>
                    }



                </div>
                
                <div className="flex gap-2 items-center justify-center">
                    <button
                        onClick={ () => handleEdit(deck) }
                         className="hover:cursor-pointer hover:bg-amber-500 p-1 rounded-md"
                    >
                    ✏️
                    </button>
                    <button
                        onClick={ ()=> handleRemove(deck.id) }
                         className="hover:cursor-pointer hover:bg-amber-500 p-1 rounded-md"
                    >
                    🗑️
                    </button>              
                </div>

            </div>
        )
    }

    if (loading) {
        return (
            <div className="">
                <div className="text-white p-4">Chargement...</div>
            </div>
        );
    }

    return(
    <div className="">
        <h2 className="text-center max-w-8xl font-bold text-2xl" >Vos Présentations</h2>



        <div className="flex flex-wrap gap-4 justify-center">
            {decks.length==0 && <p className="text-neutral-400 italic m-4">Vous n'avez pas encore de présentation</p>}
            {decks.map((deck) => (
                <DeckCard key={deck.id} deck={deck}/>
            ))}           
        </div>

    </div>
    )
}