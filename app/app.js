import React, {useState, useEffect, useRef} from "react"
import { createRoot } from 'react-dom/client'
import "./styles/main.css"
import Header from "./components/header"
import Intro from "./components/intro"
import getAllRecipes from "./allRecipes"

function App() {
    const [allRecipes, setAllRecipes] = useState(getAllRecipes())
    const [currentRecipe, setCurrentRecipe] = useState(" ")
    const [rememberedRecipes, setRememberedRecipes] = useState([])
    const [showSnapshot, setShowSnapshot] = useState(false)
    const [showZoom, setShowZoom] = useState(false)
    const [showCopy, setShowCopy] = useState(false)

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max)
    }

    function getRandomRecipe() {
        let randomRecipe = allRecipes[generateRandomNumber(allRecipes.length)]
        return randomRecipe
    }

    function handleClickGenerator() {
        setCurrentRecipe(getRandomRecipe())
        setShowZoom(true)
        setTimeout(() => setShowZoom(false), 301)
    }

    function handleClickRemember() {
        if (!rememberedRecipes.includes(currentRecipe)) {
            setRememberedRecipes([
                ...rememberedRecipes,
                currentRecipe
            ])
            setShowSnapshot(true)
            setTimeout(() => setShowSnapshot(false), 1001)
        }
    }

    function handleClickDelete() {
        setRememberedRecipes([])
    }

    function handleClickCopy() {
        navigator.clipboard.writeText(rememberedRecipes.join("\n"))
        setShowCopy(true)
        setTimeout(() => setShowCopy(false), 1001)
    }

    () => {navigator.clipboard.writeText(this.state.textToCopy)}

    return (
        <>
        <Header />

        <Intro />

        <div className="main-features">
            <div className="main-features-inner">
                <div className="dish-suggestion">
                    <h2>Gerichtvorschläge</h2>
                    <div className="result">
                        <div className="current-recipe-container">
                            <p className={"current-recipe" + (showSnapshot ? " animate-snapshot" : "") + (showZoom ? " animate-zoom" : "")}>{currentRecipe}</p>
                        </div>
                        
                    </div>
                    <div className="buttons">
                        <div className="generator-button">
                            <button className="generate" onClick={handleClickGenerator}>
                                Neuer Vorschlag
                            </button>
                        </div>
                        <div className="add-button">
                            <button className="add" onClick={handleClickRemember}>
                                Gericht merken
                            </button>
                        </div>
                    </div>
                </div>
                <div className="remembered-dishes">
                    <h2>Gemerkte Gerichte</h2>
                    <div className={"dish-list" + (showCopy ? " animate-snapshot" : "")}>
                        <ul className="dish-list">
                            {rememberedRecipes.map(rememberedRecipe => (
                                <li>{rememberedRecipe}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="buttons">
                    <div className="delete-button">
                        <button className="delete" onClick={handleClickDelete}>
                            Liste löschen
                        </button>
                    </div>
                    <div className="copy-button">
                        <button className="copy" onClick={handleClickCopy}>
                            Liste kopieren
                        </button>
                    </div>

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