import React, { useEffect, useState} from "react"
import {Main, DicePlayerOne, LockBtnBlue, LockImg, DicePlayerTwo, RobotImg} from './styled/styledComponents'
import Die from "./Die"
import Die2 from "./Die2"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"
import lock from "../imgs/lock-white.png"
import unlock from "../imgs/unlock-white.png"
import refresh from "../imgs/refresh-white.png"
import robot from "../imgs/evil-robot.png"

export default function AgainstPcMode(props) {
    const [player1Turn, setPlayer1Turn] = useState(true)
    const [hasWon, setHasWon] = useState(false)
    const [isConfettiTime, setIsConfettiTime] = useState(false)
    const [player1Win, setPlayer1Win] = useState(false)
    const [player2Win, setPlayer2Win] = useState(false)
    const [playerPcWin, setPlayerPcWin] = useState(false)
    const [diceObjs, setDiceObjs] = useState(getData())  
    const [diceObjsPlayer2, setDiceObjsPlayer2] = useState(getData())  
    const [diceObjsPc, setDiceObjsPc] = useState(getPcData())
    const [height, setHeight] = useState(null)
    const [width, setWidth] = useState(null)

    useEffect( () => {
        setHeight(props.confettiRef.current.clientHeight)
        setWidth(props.confettiRef.current.clientWidth)
    }, [diceObjs, diceObjsPc, props.confettiRef] )

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
        player1Turn === false ?
        updateUserDice() : 
        updatePCdice()
    }

    function updateUserDice() {
        setDiceObjs(prev => {
            return prev.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})
        })
    }

    function updatePCdice() {
        let  selectedEl = diceObjsPc.find(element => element.isSelected)
       
        const arrWithNewNum = diceObjsPc.map(obj => obj.isSelected ? obj : {...obj, value: getRandNum()})

        const arrWithSelectedNums = arrWithNewNum.map(obj => obj.value === selectedEl.value ? {...obj, isSelected: true} : obj)
        setDiceObjsPc(arrWithSelectedNums)
        setTimeout(() => {
            updateUserDice()
            setPlayer1Turn(prev => !prev) 
        }, 800);   
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
        setPlayer1Turn(prev => !prev) 
        roll(player)
    }

    isConfettiTime && setTimeout(() => setIsConfettiTime(false), 5000)

    return (
            <Main player1Turn={player1Turn}>
                {isConfettiTime && <Confetti height={height} width={width}/>} 
                    <RobotImg src={robot} alt="evil-robot" width="39px"/>
                    <DicePlayerTwo>
                        {diceElementsPc}
                    </DicePlayerTwo>
                <DicePlayerOne>
                    {diceElements}
                </DicePlayerOne>
                <LockBtnBlue 
                    disabled={!player1Turn}
                    onClick={() => lockClick("player1")}
                >
                    <LockImg 
                        src={hasWon ? refresh : player1Turn ? unlock : lock} 
                        alt="lock" 
                    />
                </LockBtnBlue>
            </Main>
    )
}