import React, { useEffect, useState} from "react"
import Die from "./components/Die"
import Die2 from "./components/Die2"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

export default function App() {
    const [player1Turn, setPlayer1Turn] = useState(true)
    const [hasWon, setHasWon] = useState(false)
    const [isConfettiTime, setIsConfettiTime] = useState(false)
    const [twoPlayerMode, setTwoPlayerMode] = useState(false)
    const [againstPC, setAgainstPC] = useState(false)
    const [player1Win, setPlayer1Win] = useState(false)
    const [player2Win, setPlayer2Win] = useState(false)
    const [playerPcWin, setPlayerPcWin] = useState(false)
    const [diceObjs, setDiceObjs] = useState(getData())  
    const [diceObjsPlayer2, setDiceObjsPlayer2] = useState(getData())  
    const [diceObjsPc, setDiceObjsPc] = useState(getPcData())  

    function getPcData() {
        let arrayRand = []
        let occurArr = []

        for (let i = 0; i < 10; i++) {
            arrayRand.push(getRandNum())
        }

        for (let i = 1; i <= 6; i++) {
            occurArr.push(getOccurrence(arrayRand, i))
        }
        let mostRepNum = occurArr.indexOf(Math.max(...occurArr)) + 1

        const PcObjArray = arrayRand.map( (num) => {
                            return { 
                                    id: nanoid(),
                                    value: num,
                                    isSelected: num === mostRepNum ? true : false
                            }
                        } )
        return PcObjArray              
    }

    const diceElements = diceObjs.map( (obj) => {

        return <Die 
            key={obj.id} 
            obj={obj} 
            hold={hold} 
            hasWon={hasWon} 
            player1Win={player1Win} 
            player1Turn={!player1Turn}
            twoPlayerMode={twoPlayerMode}
            againstPC={againstPC}
        />

    }) 

    const diceElementsPlayer2 = diceObjsPlayer2.map( (obj) => {

        return <Die2 
            key={obj.id} 
            obj={obj} 
            hold={hold} 
            hasWon={hasWon} 
            player2Win={player2Win} 
            player1Turn={player1Turn}
            twoPlayerMode={twoPlayerMode}
        />

    })

    const diceElementsPc = diceObjsPc.map( (obj) => {

        return <Die2 
            key={obj.id} 
            obj={obj} 
            hold={hold} 
            hasWon={hasWon} 
            player2Win={player2Win} 
            player1Turn={player1Turn}
            playerPcWin={playerPcWin}
            twoPlayerMode={twoPlayerMode}
            againstPC={againstPC}
        />

    })

    function getRandNum() {
        return Math.ceil( Math.random() * 6 )
    }
    
    
    function getOccurrence(array, value) {
        return array.filter((v) => (v === value)).length;
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
        player === "player2" ?
        setDiceObjs(prev => {
            return prev.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})
        }) : 
        againstPC ?
        updatePCdice()
        : !twoPlayerMode ?
        setDiceObjs(prev => {
            return prev.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})
            
        }) :
        setDiceObjsPlayer2(prev => {
            return prev.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})
            
        })
    }

    function updatePCdice() {
        let  selectedEl = diceObjsPc.find(element => element.isSelected)
       
        const arrWithNewNum = diceObjsPc.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})

        const arrWithSelectedNums = arrWithNewNum.map(obj => obj.value === selectedEl.value ? {...obj, isSelected: true} : obj)
        setDiceObjsPc(arrWithSelectedNums)
        setTimeout(() => lockClick("player2"), 800);   
    }

    function resetGame() {
        setDiceObjs(getData())
        setDiceObjsPlayer2(getData())
        setDiceObjsPc(getPcData())
        setHasWon(false)
        setIsConfettiTime(false)
        setPlayer1Turn(true)
        setPlayer1Win(false)
        setPlayer2Win(false)
        setPlayerPcWin(false)
    }

    useEffect( checkForWin, [diceObjs, diceObjsPlayer2, diceObjsPc] )

    function checkForWin() {
        const isAllSame = diceObjs.filter( obj => obj.value  === diceObjs[0].value && obj.isSelected && obj)
        const isAllSamePlayer2 = diceObjsPlayer2.filter( obj => obj.value  === diceObjsPlayer2[0].value && obj.isSelected && obj)
        const isAllSamePc = diceObjsPc.filter( obj => obj.value  === diceObjsPc[0].value && obj.isSelected && obj)


        if (isAllSame.length === diceObjs.length) {
            victory('player1')
        } else if (isAllSamePlayer2.length === diceObjsPlayer2.length) {
            victory('player2')
        } else if (isAllSamePc.length === diceObjsPc.length) {
            victory('PC')
        }
    }

    function victory(winner) {
        setHasWon(true);
        setIsConfettiTime(true);
        setPlayer1Turn(true)
        winner === 'player1' ? 
        setPlayer1Win(true) :
        winner === 'player2' ?
        setPlayer2Win(true) :
        setPlayerPcWin(true)
    }

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

    isConfettiTime && setTimeout(() => setIsConfettiTime(false), 4000)

    return (
        <div className="outerContainer">
            <header className="mode">
                <h3 className="header--title">
                    Tenzies
                </h3>
                <nav className="btns">
                    

                    <a href="#main">
                        <span onClick={() => {
                            setTwoPlayerMode(false)
                            resetGame()
                            setAgainstPC(false)
                            setPlayer1Turn(true)}}
                            className="menu-btn"
                        >
                            One Player
                        </span>
                    </a>
                    
                    <a href="#main">
                        <span 
                            onClick={() => {
                            setTwoPlayerMode(true) 
                            setAgainstPC(false)
                            resetGame()}} 
                            className="menu-btn"
                        >
                            Two Players 
                        </span>
                    </a>

                    <a href="#main">
                        <span 
                            onClick={() => {
                            setAgainstPC(true) 
                            resetGame()}} 
                            className="menu-btn"
                        >
                            Human vs Machine 
                        </span>
                    </a>

                </nav>
            </header>
            <main id="main" className={`diceContainer ${player1Turn ? "player1Turn" : "player2Turn"}`}>
                {isConfettiTime && <Confetti />} 
                {twoPlayerMode || againstPC ? 
                    <div className="btns-container">
                        {againstPC ? 
                        <div className="evil-robot">
                            <img src={`../imgs/evil-robot.png`} alt="evil-robot" width="39px"/>
                        </div> :
                        <button 
                            disabled={player1Turn}
                            className="lockBtn" 
                            onClick={() => lockClick("player2")}
                        >
                            <img 
                                src={`../imgs/${!player1Turn ? 'unlock' : 'lock'}-white.png`} 
                                alt="lock" 
                                className="lock"
                            />
                        </button>}
                    </div> : 
                    <h1 className="diceContainer--title">
                        Tenzies
                    </h1>}
                {twoPlayerMode || againstPC ?
                    <div className="dicePlayer2 dice">
                        {againstPC ? diceElementsPc : diceElementsPlayer2}
                    </div> : 
                    <p className="diceContainer--instructions">
                        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                    </p>}
                <div className="dice">
                    {diceElements}
                </div>
                <div className="btns-container">
                    {!twoPlayerMode && !againstPC && 
                    <button
                        className="diceContainer--btn" 
                        onClick={() => roll('player1')}
                    >
                        {hasWon ? 'Play Again' : 'Roll'}
                    </button>} 
                    {twoPlayerMode || againstPC ? 
                    <button 
                        disabled={!player1Turn}
                        className="lockBtnBlue"
                        onClick={() => lockClick("player1")}
                    >
                        <img 
                            src={`../imgs/${hasWon ? 'refresh' : player1Turn ? 'unlock' : 'lock'}-white.png`} 
                            alt="lock" 
                            className="lock"
                        />
                    </button> : null} 
                </div>
            </main>
            <footer className="mode footer">
                    <div className="footer--info">
                        <ul className="social--ul">
                            <li className="social--li"><a href="https://github.com/DaviDev01" rel="noreferrer" target="_blank"><i className="fab fa-github-square"></i></a></li>
                            <li className="social--li"><a href="https://www.linkedin.com/in/davi-mendes-868b6b207/" rel="noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                            <li className="social--li"><a href="https://twitter.com/DavidaviMendes" rel="noreferrer" target="_blank"><i className="fab fa-twitter-square"></i></a></li>
                        </ul>
                    </div>
            </footer>
        </div>
    )
}