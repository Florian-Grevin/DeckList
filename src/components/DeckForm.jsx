import { useState,useEffect } from "react"

export default function DeckForm({addDeck, deck, closeForm}) {

    const [formData, setFormData] = useState({
        title: '',
        theme: '',
        ratio: '',
    })

    const isEditing = !!deck;


    const EMPTY_DECK = {
            title: "",
            theme: "",
            ratio: "",
    };

    useEffect(() => {
  if (deck) {
    setFormData({
      title: deck.title || "",
      theme: deck.theme || "",
      ratio: deck.ratio || "",
    });
  } else {
    setFormData(EMPTY_DECK);
  }
}, [deck]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

     const handleSubmit = (e) => {
        //checkData(formData) // optionnel (to do placer dans form)
        e.preventDefault()
        setFormData(formData);
        addDeck(formData)
    }

    const handleClose = () => {
        undoSubmit();
        closeForm();
    };


    const undoSubmit = () => {
        setFormData(EMPTY_DECK);
    };

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
        <h2 className="text-xl font-bold mb-4 text-center">{isEditing ? "🎨 Modifier Présentation" : "🎨 Nouvelle Présentation"}</h2>
            <form onSubmit={handleSubmit} id="deckForm">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre
                </label>
                <input
                type="text"
                id="title"
                name="title"
                placeholder="NewDeck"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                value={formData.title}
                onChange={handleChange}
                required
                />

                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                Thème
                </label>
                <select
                id="theme"
                name="theme"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                value={formData.theme}
                onChange={handleChange}
                required
                >
                <option value="default">Default</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="purple">Purple</option>
                </select>

                <label htmlFor="ratio" className="block text-sm font-medium text-gray-700 mb-1">
                Ratio
                </label>
                <select
                id="ratio"
                name="ratio"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                value={formData.ratio}
                onChange={handleChange}
                required
                >
                <option value="16:9">16:9</option>
                <option value="4:3">4:3</option>
                <option value="16:10">16:10</option>
                </select>

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