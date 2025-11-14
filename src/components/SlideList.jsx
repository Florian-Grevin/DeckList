import { createElement } from "react";
import { useState, useEffect } from "react";
import SlideFrame from "./SlideFrame";
import { getSlideKindTag, getKindClass } from "../utils/slideUtils";


import { DndContext } from '@dnd-kit/core';

// import {Draggable} from './Draggable';
// import {Droppable} from './Droppable';


export default function SlideList({ ratio, loading, slides, updateSlide, handleRemove, handleEdit, openForm }) {

    const [isPresOpen, setIsPresOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(null);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft" && selectedSlide?.order > 0) {
            changeSlide('-');
            }
            if (e.key === "ArrowRight" && selectedSlide?.order < slides.length - 1) {
            changeSlide('+');
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedSlide, slides]);


    const openPres = (slide) => {
        setSelectedSlide(slide);
        setIsPresOpen(true);
    }

    const closePres = () => {
        setSelectedSlide(null);
        setIsPresOpen(false);
    }

    const changeSlide = (state) => {
        const slidePos = slides[selectedSlide?.order].order;
        if (state === '-' && slidePos > 0) setSelectedSlide(slides[slidePos - 1])
        else if (state === '+' && slidePos < slides.length - 1) setSelectedSlide(slides[slidePos + 1])
    }

    const editForm = (slide) => {
        handleEdit(slide);
        openForm();
    }

    const SlideCard = ({ slide }) => (
        <SlideFrame
            slide={slide}
            ratio={ratio}
            width="500px"
            onClick={() => openPres(slide)}
            showControls={true}
            order={slide.order + 1}
            onEdit={editForm}
            onRemove={handleRemove}
        />
    );

    if (loading) {
        return (
            <div className="">
                <div className="text-black p-4">Chargement...</div>
            </div>
        );
    }

    return (
        <>

            {isPresOpen && selectedSlide && (
                <div
                    className="flex fixed inset-0 bg-[#0008] items-center justify-center z-50 p-6"
                    onClick={closePres}
                >
                    <div
                        className="flex justify-between items-center relative p-6 mx-auto bg-white rounded-lg shadow-lg border-2 border-amber-500"
                        style={{ 
                            aspectRatio: ratio?.replace(":", "/"),
                            height: "80%",
                            maxHeight: "2000px",
                            
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closePres}
                            className="absolute top-1 right-1 text-xl text-gray-600 hover:cursor-pointer hover:text-red-500"
                        >
                            ✖
                        </button>

                        <div className="flex justify-between h-full w-full">
                            <div className="flex justify-center items-center">
                                <button
                                    className={`font-bold m-2 text-4xl ${selectedSlide?.order === 0
                                        ? "opacity-0 cursor-default"
                                        : "text-black hover:cursor-pointer hover:bg-cyan-700"
                                        }`}
                                    onClick={selectedSlide?.order === 0 ? undefined : () => changeSlide('-')}
                                    disabled={selectedSlide?.order === 0}
                                >
                                    ←
                                </button>
                            </div>

                            <SlideFrame
                            slide={selectedSlide}
                            ratio={ratio}
                            borderColor="transparent"
                            />

                            <div className="flex flex-col justify-center items-center">
                                <button
                                    className={`font-bold m-2 text-4xl ${selectedSlide?.order === slides.length - 1
                                        ? "opacity-0 cursor-default"
                                        : "text-black hover:cursor-pointer hover:bg-cyan-700"
                                        }`}
                                    onClick={selectedSlide?.order === slides.length - 1 ? undefined : () => changeSlide('+')}
                                    disabled={selectedSlide?.order === slides.length - 1}
                                >
                                    →
                                </button>
                            </div>

                            
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-3 items-center justify-center">
                {slides.map((slide) => (
                    <SlideCard key={slide.id} slide={slide} />
                ))}
            </div>


        </>
    )
} 