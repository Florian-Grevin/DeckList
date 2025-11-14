import { useState, useEffect, useRef } from "react";


/* Pouvoir écrire du code tout en évitant des injections de code (sécurité en soit) */
export default function SlideForm({ createSlide, theme, closeForm, slides, editingSlide }) {

    const inputRef = useRef(null);

    const [formData, setFormData] = useState({
        kind: "",
        title: "",
        content: "",
        imageUrl: null,
        bg: "#ffffff",
        order: "",
    })

    const isEditing = !!editingSlide;

    const setColorTheme = () => {

        const rootStyles = getComputedStyle(document.documentElement);
        const themeColor = rootStyles.getPropertyValue(`--${theme}_primary`).trim();

        setFormData((prev) => ({ ...prev, bg: themeColor }));

    }

    useEffect(() => {
        if (isEditing) {
            setFormData(editingSlide);
        } else {
            setColorTheme();
        }
    }, [editingSlide]);




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        undoSubmit();
        closeForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        setFormData(formData);

        let newOrder = 100 // ne devrait jamais s'afficher
        if (isEditing) {
            newOrder = editingSlide.order
        } else {
            newOrder = slides && slides.length > 0 ? slides[slides.length - 1].order + 1 : 0;
        }

        const updatedFormData = {
            ...formData,
            order: newOrder,
        };

        createSlide(updatedFormData)
        closeForm()
    }

    const undoSubmit = () => {
        setFormData(EMPTY_SLIDE);
    };

    const EMPTY_SLIDE = {
        kind: "",
        title: "",
        content: "",
        imageUrl: null,
        bg: "#ffffff",
        order: "",
    }

    return (

        <div
            className="fixed inset-0 bg-[#0008] flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div className="relative w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border-2 border-amber-500">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500"
                >
                    ✖
                </button>
                <div onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <h2 className="text-xl font-bold mb-4 text-center"> {isEditing ? "Modifier la slide" : "Nouvelle Slide"}</h2>
                    <form onSubmit={handleSubmit} id="slideForm">
                        <label htmlFor="kind" className="block text-sm font-medium text-gray-700 mb-1">
                            Type
                        </label>
                        <select
                            id="kind"
                            name="kind"
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            value={formData.kind}
                            onChange={handleChange}
                            required
                        >
                            <option value="title">Titre</option>
                            <option value="text">Texte</option>
                            <option value="image">Image</option>
                            <option value="split">Slide divisée</option>
                            <option value="list">Liste</option>
                            <option value="quote">Citation</option>
                            <option value="code">Code</option>
                        </select>

                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Titre
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Nouvelle Slide"
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        {formData.kind === "image" ? (
                            <>
                                <label
                                    htmlFor="imageUrl"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Image source
                                </label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    placeholder="Lien de l'image"
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <>
                            </>
                        )}

                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Contenu
                        </label>
                        <textarea
                            type="text"
                            id="content"
                            name="content"
                            placeholder="Contenu"
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            value={formData.content}
                            onChange={handleChange}
                        />

                        <label htmlFor="bg" className="block text-sm font-medium text-gray-700 mb-1">
                            Couleur de fond:
                        </label>
                        <input
                            type="color"
                            id="bg"
                            name="bg"
                            className="mb-4 cursor-pointer"
                            ref={inputRef}
                            value={formData.bg}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700"
                            onClick={() => {
                                setColorTheme();
                            }}
                        >
                            Couleur du thème
                        </button>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            💾 Enregistrer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}