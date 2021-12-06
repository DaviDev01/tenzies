import React, { useEffect, useState } from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

export default function App() {
    const [diceObjs, setDiceObjs] = useState(getData())  
    const [diceObjsPlayer2, setDiceObjsPlayer2] = useState(getData())  
    const [hasWon, setHasWon] = useState(false)
    const [isConfettiTime, setIsConfettiTime] = useState(false)
    const [twoPlayerMode, setTwoPlayerMode] = useState(false)
    const [player1Turn, setPlayer1Turn] = useState(true)
    //const numOfDice = 10
    const diceElements = diceObjs.map( (obj) => {

        return <Die key={obj.id} obj={obj} hold={hold} hasWon={hasWon} player1Turn={!player1Turn}/>

    }) 

    const diceElementsPlayer2 = diceObjsPlayer2.map( (obj) => {

        return <Die key={obj.id} obj={obj} hold={hold} hasWon={hasWon} player1Turn={player1Turn}/>

    })

    function getRandNum() {
        return Math.ceil( Math.random() * 6 )
    }

    function getData() {
        let numOfDice = 10
        const arrayNum = []

        for (let i = 1; i <= numOfDice; i++ ) {
            arrayNum.push(
                { 
                    id: nanoid(),
                    value: getRandNum(),
                    isSelected: false
                }
            ) 
        }

        return arrayNum
    }

    function roll(player) {
        hasWon ? resetGame() :
        player === "player1" ?
        setDiceObjs(prev => {
            return prev.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})
        }) : 
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

    useEffect( checkForWin, [diceObjs, diceObjsPlayer2] )

    function checkForWin() {
        const isAllSame = diceObjs.filter( obj => obj.value  === diceObjs[0].value && obj.isSelected && obj)
        const isAllSamePlayer2 = diceObjsPlayer2.filter( obj => obj.value  === diceObjsPlayer2[0].value && obj.isSelected && obj)

        if (isAllSame.length === diceObjs.length) {
            setHasWon(true);
            setIsConfettiTime(true);
            console.log("player1 wins")
        } else if (isAllSamePlayer2.length === diceObjsPlayer2.length) {
            setHasWon(true);
            setIsConfettiTime(true)
            console.log("player2 wins")
        }
    }

    console.log(isConfettiTime)
    function hold(id, e) {
        const updatedArray = diceObjs.map( (obj) => obj.id === id ? {...obj, isSelected: !obj.isSelected} : obj)

        setDiceObjs(updatedArray)

        const updatedArray2 = diceObjsPlayer2.map( (obj) => obj.id === id ? {...obj, isSelected: !obj.isSelected} : obj)

        setDiceObjsPlayer2(updatedArray2)
    }
    
    function lockClick(player) {
        if (player === "player1") {
            setPlayer1Turn(false) 
            roll(player)
        } else {
            setPlayer1Turn(true)
            roll(player)
        }
    }

    isConfettiTime && setTimeout(() => setIsConfettiTime(false), 3740)

    return (
        <div className="outerContainer">
            <div className="mode">
                <div className="btns">
                    <h3 className="mode--title">Mode</h3>
                    <span 
                        onClick={() => {
                        setTwoPlayerMode(true) 
                        resetGame()}} 
                        className="menu-btn"
                    >
                            Two Players Mode
                    </span>
                    <span onClick={() => {
                        setTwoPlayerMode(false)
                        resetGame()
                        setPlayer1Turn(true)}} 
                        className="menu-btn"
                    >
                        One Player Mode
                    </span>
                </div>
                {twoPlayerMode && <p className="diceContainer--instructions mode-instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
            </div>
            <main className={`diceContainer ${player1Turn ? "player1Turn" : "player2Turn"}`}>
                {isConfettiTime && <Confetti />} 
                {twoPlayerMode ? 
                    <div className="btns-container">
                        <button 
                            disabled={player1Turn}
                            className="lockBtn" 
                            onClick={() => lockClick("player2")}
                        >
                            <img src={`../imgs/${!player1Turn ? 'unlock' : 'lock'}-white.png`} alt="lock" className="lock"/>
                        </button> 
                    </div> : 
                    <h1 className="diceContainer--title">
                        Tenzies
                    </h1>}
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
                        onClick={() => roll('player1')}
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
                        <img src={`../imgs/${player1Turn ? 'unlock' : 'lock'}-white.png`} alt="lock" className="lock"/>
                    </button>
                    }
                </div>
            </main>
            <div className="mode hide">
                
            </div>
        </div>
    )
}