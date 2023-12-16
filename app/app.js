import React, {useState, useEffect, useRef} from "react"
import { createRoot } from 'react-dom/client'
import "./styles/main.css"
import logo from './images/logo_small.jpg'


function App() {
    const [allRecipes, setAllRecipes] = useState(getAllRecipes())
    const [currentRecipe, setCurrentRecipe] = useState("")
    const [rememberedRecipes, setRememberedRecipes] = useState([])

    function getAllRecipes() {
        return [
            "Risotto",
            "Lasagne",
            "Ofengemüse",
            "Penne Arrabiata",
            "Belugalinsensalat",
            "Tofu-Geschnetzeltes",
            "Petersilien-Zitronen-Spaghetti",
            "Linseneintopf",
            "Semmelknödel mit Pilz-Rahm-Soße",
            "Sommerrollen"
        ]
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max)
    }

    function getRandomRecipe() {
        let randomRecipe = allRecipes[generateRandomNumber(allRecipes.length)]
        return randomRecipe
    }

    function handleClickGenerator() {
        setCurrentRecipe(getRandomRecipe())
        console.log(currentRecipe)
    }

    function handleClickRemember() {
        setRememberedRecipes([
            ...rememberedRecipes,
            currentRecipe
        ])
    }

    function handleClickDelete() {
        setRememberedRecipes([])
    }

    return (
        <>
        <div className="header">
            <div>
                <img src={logo} alt="Logo" className="logo"/>
            </div>
            
        </div>
        <div className="intro">
            <div className="intro-inner">
                <div className="heading">
                    <h1>T&T's Dish Generator</h1>
                </div>
                <div className="explanation">
                    <p>Keine Ahnung was wir nächste Woche kochen könnten? Dann lass den Dish Generator aus T&T's Lieblingsrezepten auswählen.</p>
                </div>
            </div>
        </div>
        
        <div className="main-features">
            <div className="main-features-inner">
                <div className="dish-suggestion">
                    <h2>Gerichtvorschläge</h2>
                    <div className="result">
                        <p className="current-recipe">{currentRecipe}</p>
                    </div>
                    <div className="generator-button">
                        <button className="generator" onClick={handleClickGenerator}>
                            Neuer Vorschlag
                        </button>
                    </div>
                    <div className="add-button">
                        <button className="add" onClick={handleClickRemember}>
                            Gericht merken
                        </button>
                    </div>
                </div>
                <div className="remembered-dishes">
                    <h2>Gemerkte Gerichte</h2>
                    <div className="dish-list">
                        <ul className="dish-list">
                            {rememberedRecipes.map(rememberedRecipe => (
                                <li>{rememberedRecipe}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="delete-button">
                        <button className="delete" onClick={handleClickDelete}>
                            Liste löschen
                        </button>
                    </div>

                </div>
            </div>            
        </div>
        </>
        )
}

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(<App />);

if (module.hot) {
    module.hot.accept()
}