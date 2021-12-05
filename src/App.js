import React, { useEffect, useState } from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"

export default function App() {
    const [diceObjs, setDiceObjs] = useState(getData())  
    const [hasWon, setHasWon] = useState(false)
    const [isConfettiTime, setIsConfettiTime] = useState(false)
    
    const diceElements = diceObjs.map( (obj) => {

        return <Die key={obj.id} obj={obj} hold={hold} hasWon={hasWon}/>

    }) 

    function getRandNum() {
        return Math.ceil( Math.random() * 6 )
    }

    function getData() {
        const arrayNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        const objArray = arrayNum.map( (id) => ( { 
                id: id,
                value: getRandNum(),
                isSelected: false
            })
        )

        return objArray
    }

    function roll() {
        hasWon ? resetGame() :
        setDiceObjs(prev => {
            return prev.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})
        })
    }

    function resetGame() {
        setDiceObjs(getData())
        setHasWon(false)
        setIsConfettiTime(false)
    }

    useEffect( checkForWin, [diceObjs] )
    function checkForWin() {
        const isAllSame = diceObjs.filter( obj => obj.value  === diceObjs[0].value && obj.isSelected && obj)
        
        if (isAllSame.length === diceObjs.length) {
            setHasWon(true);
            setIsConfettiTime(true);
        } 
    }
    console.log(isConfettiTime)
    function hold(id, e) {
        const updatedArray = diceObjs.map( (obj) => obj.id === id ? {...obj, isSelected: !obj.isSelected} : obj)

        setDiceObjs(updatedArray)
    }
    
    isConfettiTime && setTimeout(() => setIsConfettiTime(false), 3740)

    return (
        <main className="diceContainer">
            {isConfettiTime && <Confetti />} 
            <h1 className="diceContainer--title">Tenzies</h1>
            <p className="diceContainer--instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice">
                {diceElements}
            </div>
            <button className="diceContainer--btn" onClick={roll}>{hasWon ? 'Play Again' : 'Roll'}</button>
        </main>
    )
}