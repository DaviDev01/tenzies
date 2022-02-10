import React, { useEffect, useState} from "react"
import {Main, LockBtn, DicePlayerOne, LockBtnBlue, LockImg, DicePlayerTwo} from './styled/styledComponents'
import Die from "./Die"
import Die2 from "./Die2"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"
import lock from "../imgs/lock-white.png"
import unlock from "../imgs/unlock-white.png"
import refresh from "../imgs/refresh-white.png"

export default function TwoPlayerMode(props) {
    const [player1Turn, setPlayer1Turn] = useState(true)
    const [hasWon, setHasWon] = useState(false)
    const [isConfettiTime, setIsConfettiTime] = useState(false)
    const [player1Win, setPlayer1Win] = useState(false)
    const [player2Win, setPlayer2Win] = useState(false)
    const [diceObjs, setDiceObjs] = useState(getData())  
    const [diceObjsPlayer2, setDiceObjsPlayer2] = useState(getData())  
    const [height, setHeight] = useState(null)
    const [width, setWidth] = useState(null)

    useEffect( () => {
        setHeight(props.confettiRef.current.clientHeight)
        setWidth(props.confettiRef.current.clientWidth)
    }, [diceObjs, diceObjsPlayer2, props.confettiRef] )

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

    const diceElementsPlayer2 = diceObjsPlayer2.map( (obj) => {

        return <Die2 
            key={obj.id} 
            obj={obj} 
            hold={hold} 
            hasWon={hasWon} 
            player2Win={player2Win} 
            player1Turn={player1Turn}
        />

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

    function roll() {
        hasWon ? resetGame() :
        player1Turn === false ?
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
        setPlayer1Turn(true)
        setPlayer1Win(false)
        setPlayer2Win(false)
    }

    useEffect( checkForWin, [diceObjs, diceObjsPlayer2] )

    function checkForWin() {
        const isAllSame = diceObjs.filter( obj => obj.value  === diceObjs[0].value && obj.isSelected && obj)
        const isAllSamePlayer2 = diceObjsPlayer2.filter( obj => obj.value  === diceObjsPlayer2[0].value && obj.isSelected && obj)


        if (isAllSame.length === diceObjs.length) {
            victory()
        } else if (isAllSamePlayer2.length === diceObjsPlayer2.length) {
            victory()
        }
    }

    function victory() {
        setHasWon(true);
        setIsConfettiTime(true);
        setPlayer1Turn(true)
        player1Turn ? 
        setPlayer1Win(true) :
        !player1Turn &&
        setPlayer2Win(true) 
    }

    function hold(id, e) {
        const updatedArray = diceObjs.map( (obj) => obj.id === id ? {...obj, isSelected: !obj.isSelected} : obj)

        setDiceObjs(updatedArray)

        const updatedArray2 = diceObjsPlayer2.map( (obj) => obj.id === id ? {...obj, isSelected: !obj.isSelected} : obj)

        setDiceObjsPlayer2(updatedArray2)
    }
    
    function lockClick() {
        setPlayer1Turn(prev => !prev) 
        roll()
    }

    isConfettiTime && setTimeout(() => setIsConfettiTime(false), 5000)

    return (
        <Main player1Turn={player1Turn}>
            {isConfettiTime && <Confetti height={height} width={width}/>} 
                <LockBtn 
                    disabled={player1Turn}
                    onClick={lockClick}
                >
                    <LockImg 
                        src={!player1Turn ? unlock : lock} 
                        alt="lock" 
                    />
                </LockBtn>
            <DicePlayerTwo>
                {diceElementsPlayer2}
            </DicePlayerTwo> 
            <DicePlayerOne>
                {diceElements}
            </DicePlayerOne>
            <LockBtnBlue 
                disabled={!player1Turn}
                onClick={lockClick}
            >
                <LockImg 
                    src={hasWon ? refresh : player1Turn ? unlock : lock} 
                    alt="lock" 
                />
            </LockBtnBlue> 
        </Main>
    )
}