import { createElement } from "react";

export default function SlideList({ratio, loading, slides,updateSlide,handleRemove, handleEdit, openForm}) {

    const getSlideKindTag = (kind) => {
        switch (kind) {
            case "title": return "h3";
            case "text": return "p";
            case "image": return "img";
            case "split": return "span";
            case "list": return "ul";
            case "quote": return "blockquote";
            case "code": return "code";
            default: return "div";
        }
    };

    const getKindClass = (kindTag) => {
        switch (kindTag) {
            case "h3": return "text-2xl font-semibold mb-2";
            case "p": return "text-base text-gray-800 mb-1";
            case "img": return "w-full h-auto rounded-lg shadow-md mb-4";
            case "span": return "inline-block text-sm ";
            case "ul": return "list-disc list-inside ";
            case "blockquote": return "border-l-4 bg-white border-gray-400 pl-4 italic text-gray-600";
            case "code": return "bg-gray-800 text-green-600 p-2 rounded text-sm font-mono";
            default: return "text-black";
        }
    };

    const editForm = (slide) => {
        handleEdit(slide);
        openForm();
    }

    const SlideCard = ({ slide }) => {
        const kindTag = getSlideKindTag(slide.kind);
        const className = getKindClass(kindTag);

        const props = { className };


        return (
            <div
                style={{ 
                    backgroundColor: slide.bg, 
                    width:"30%", 
                    aspectRatio: ratio?.replace(":", "/") 
                }}
                className="flex flex-col text-black m-1 shadow-lg rounded-xl relative overflow-hidden"
            >
                <h2 className="text-2xl font-bold text-center mt-2 mb-4">{slide.title}</h2>
                
                {/* Container qui respecte l'espace restant */}
                <div className="flex-1 flex items-center justify-center overflow-hidden">
                    {slide.kind === "image" ? (
                        <img 
                            className="max-w-full max-h-full object-contain" 
                            src={slide.imageUrl}
                            alt={slide.title}
                        />
                    ) : (
                        createElement(kindTag, props, slide.content)
                    )}
                </div>
                
                <p className="bg-white font-bold absolute bottom-0 right-0 m-2 px-2 py-1 rounded">
                    {slide.order + 1}
                </p>
                
                <div className="flex gap-2 items-center justify-center mt-2">
                    <button
                        onClick={() => editForm(slide)}
                        className="hover:cursor-pointer hover:bg-amber-500 p-1 rounded-md"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => handleRemove(slide.id)}
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
                <div className="text-black p-4">Chargement...</div>
            </div>
        );
    }

    return(
        <div className="">

            <div className="flex flex-wrap gap-3 justify-center">
                {slides.map((slide)=>(
                    <SlideCard key={slide.id} slide={slide} />
                ))}
            </div>

        </div>
    )
} 