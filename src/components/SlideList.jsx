import { useState, useEffect } from "react";

export default function SlideList({loading,slides}) {

    const SlideCard = ({slide}) => {
        return (
            <div className="flex flex-col text-black bg-neutral-300 aspect-<16/9> m-1 p-10 shadow-lg rounded-xl">
                <p>Id: {slide.id}</p>
                <p>Kind: {slide.kind}</p>
                <p>Content: {slide.content}</p>
                <p>Url: {slide.imageUrl}</p>
                <p>Order: {slide.order}</p>
                <p>Bg: {slide.bg}</p>
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

            <div className="flex flex-wrap gap-3">
                {slides.map((slide)=>(
                    <SlideCard key={slide.id} slide={slide} />
                ))}
            </div>

        </div>
    )
}