// src/assets/utils/slideUtils.js

export const getSlideKindTag = (kind) => {
    switch (kind) {
        case "title": return "h3";
        case "text": return "p";
        case "image": return "cite";
        case "split": return "span";
        case "list": return "ul";
        case "quote": return "blockquote";
        case "code": return "code";
        default: return "div";
    }
};

export const getKindClass = (kindTag) => {
    switch (kindTag) {
        case "h3": return "text-2xl font-semibold mb-2";
        case "p": return "text-base mb-1";
        case "cite": return "text-center text-sm mt-2";
        case "span": return "inline-block text-sm columns-3";
        case "ul": return "list-disc list-inside";
        case "blockquote": return "border-l-4 bg-white border-gray-400 px-4 italic text-gray-600";
        case "code": return "bg-gray-800 text-green-600 p-2 rounded text-sm font-mono";
        default: return "text-black";
    }
};
