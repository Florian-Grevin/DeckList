import React, { useEffect, useRef, useState, createElement } from "react";
import { getSlideKindTag, getKindClass } from "../utils/slideUtils";

import { getContrastColor } from "../utils/colorUtils";

const SlideFrame = ({
  slide,
  ratio,
  width,
  borderColor,
  onClick,
  showControls = false,
  order,
  onEdit,
  onRemove,
}) => {
  const kindTag = getSlideKindTag(slide.kind);
  const className = getKindClass(kindTag);

  const scrollRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

  // Exclure certains types
  const colorClass =
    slide.kind === "code" || slide.kind === "cite"
      ? "black"
      : getContrastColor(slide.bg);
  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setHasScroll(el.scrollHeight > el.clientHeight);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [slide]);

  return (
    <div
      style={{
        backgroundColor: slide.bg,
        width: width,
        aspectRatio: ratio?.replace(":", "/"),
        borderColor,
        color: colorClass
      }}
      className={`flex flex-col m-1 p-2 shadow-lg rounded-xl relative overflow-hidden`}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold text-center mt-1 mb-2">{slide.title}</h2>

      <div
        ref={scrollRef}
        className={`custom-scroll flex-1 flex flex-wrap overflow-y-auto overflow-x-hidden justify-center ${
          hasScroll ? "items-start" : "items-center"
        }`}
      >

        <div className="flex flex-col items-center">
            {slide.kind === "image" && (
            <img
                className="max-w-[50%] max-h-[50%] object-contain"
                src={slide.imageUrl}
                alt={slide.title}
            />
            )}    
            {createElement(kindTag, { className }, slide.content)}            
        </div>

      </div>

      {showControls && (
        <div
          className="relative flex justify-between"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p 
            className={`font-bold absolute bottom-0 right-0 m-2 me-4 px-2 py-1 rounded`}
            style={{ color: colorClass }}
          >
            {order}
          </p>
          <div className="bottom-0 flex gap-2 justify-center mt-2">
            <button
              onClick={() => onEdit?.(slide)}
              className={`hover:cursor-pointer hover:bg-amber-500 p-1 rounded-md`}
              style={{ backgroundColor: colorClass }}
            >
              ✏️
            </button>
            <button
              onClick={() => onRemove?.(slide.id)}
              className={`hover:cursor-pointer hover:bg-amber-500 p-1 rounded-md`}
              style={{ backgroundColor: colorClass }}
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideFrame;
