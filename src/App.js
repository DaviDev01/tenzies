import React, { useEffect, useState } from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"

export default function App() {
    const [diceObjs, setDiceObjs] = useState(getData())  
    const [diceObjsPlayer2, setDiceObjsPlayer2] = useState(getData())  
    const [hasWon, setHasWon] = useState(false)
    const [isConfettiTime, setIsConfettiTime] = useState(false)
    const [twoPlayerMode, setTwoPlayerMode] = useState(true)
    const [player1Turn, setPlayer1Turn] = useState(true)
    
    const diceElements = diceObjs.map( (obj) => {

        return <Die key={obj.id} obj={obj} hold={hold} hasWon={hasWon} player1Turn={!player1Turn}/>

    }) 

    const diceElementsPlayer2 = diceObjsPlayer2.map( (obj) => {

        return <Die key={obj.id} obj={obj} hold={holdPlayer2} hasWon={hasWon} player1Turn={player1Turn}/>

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

    function rollPlayer2() {
        hasWon ? resetGame() :
        setDiceObjsPlayer2(prev => {
            return prev.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})
        })
    }

    function resetGame() {
        setDiceObjs(getData())
        setDiceObjsPlayer2(getData())
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

    useEffect( checkForWin2, [diceObjsPlayer2] )
    
    function checkForWin2() {
        const isAllSame = diceObjsPlayer2.filter( obj => obj.value  === diceObjsPlayer2[0].value && obj.isSelected && obj)
        
        if (isAllSame.length === diceObjsPlayer2.length) {
            setHasWon(true);
            setIsConfettiTime(true);
        } 
    }

    console.log(isConfettiTime)
    function hold(id, e) {
        const updatedArray = diceObjs.map( (obj) => obj.id === id ? {...obj, isSelected: !obj.isSelected} : obj)

        setDiceObjs(updatedArray)
    }

    function holdPlayer2(id, e) {
        const updatedArray = diceObjsPlayer2.map( (obj) => obj.id === id ? {...obj, isSelected: !obj.isSelected} : obj)

        setDiceObjsPlayer2(updatedArray)
    }
    
    function lockClick(player) {
        if (player === "player1") {
            setPlayer1Turn(false) 
            rollPlayer2()
        } else {
            setPlayer1Turn(true)
            roll()
        }
    }

    isConfettiTime && setTimeout(() => setIsConfettiTime(false), 3740)

    return (
        <main className={`diceContainer ${player1Turn ? "player1Turn" : "player2Turn"}`}>
            {isConfettiTime && <Confetti />} 
            {twoPlayerMode ? 
                <div className="btns-container">
                    <button 
                        disabled={player1Turn}
                        className="lockBtn" 
                        onClick={() => lockClick("player2")}
                    >
                        <img src="../imgs/lock-white.png" alt="lock" className="lock"/>
                    </button> 
                </div> : 
                <h1 className="diceContainer--title">Tenzies</h1>}
            {twoPlayerMode ?
                <div className="dicePlayer2">
                    {diceElementsPlayer2}
                </div> : 
            <p className="diceContainer--instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}

            <div className="dice">
                {diceElements}
            </div>
            <div className="btns-container">
                {!twoPlayerMode && <button
                    className="diceContainer--btn" 
                    onClick={roll}
                >
                    {hasWon ? 'Play Again' : 'Roll'}
                </button>} 
                {
                twoPlayerMode && 
                <button 
                    disabled={!player1Turn}
                    className="lockBtnBlue"
                    onClick={() => lockClick("player1")}
                >
                    <img src="../imgs/lock-white.png" alt="lock" className="lock"/>
                </button>
                }
            </div>
        </main>
    )
}