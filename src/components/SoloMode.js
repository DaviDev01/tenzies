import React, {useState, useEffect} from 'react'
import {Main, RollBtn, DiceContainerTitle, DiceContainerInstructions, DicePlayerOne} from './styled/styledComponents'
import Die from "./Die"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

export default function SoloMode(props) {
    const [hasWon, setHasWon] = useState(false)
    const [isConfettiTime, setIsConfettiTime] = useState(false)
    const [diceObjs, setDiceObjs] = useState(getData())  
    const [height, setHeight] = useState(null)
    const [width, setWidth] = useState(null)

    useEffect( () => {
        setHeight(props.confettiRef.current.clientHeight)
        setWidth(props.confettiRef.current.clientWidth)
    }, [diceObjs, props.confettiRef] )

    const diceElements = diceObjs.map( (obj) => {

        return <Die 
            key={obj.id} 
            obj={obj} 
            hold={hold} 
            hasWon={hasWon} 
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

        isAllSame.length === diceObjs.length && victory()
    }

    function victory() {
        setHasWon(true)
        setIsConfettiTime(true)
    }

    function hold(id, e) {
        setDiceObjs((prev) => prev.map( (obj) => obj.id === id ? {...obj, isSelected: !obj.isSelected} : obj))
    }

    isConfettiTime && setTimeout(() => setIsConfettiTime(false), 5000)

    return (
        <Main player1Turn={true}>
            {isConfettiTime && <Confetti height={height} width={width}/>} 
            <DiceContainerTitle>
                        Tenzies
                    </DiceContainerTitle>
            <DiceContainerInstructions>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </DiceContainerInstructions>
            <DicePlayerOne>
                {diceElements}
            </DicePlayerOne>
            <RollBtn
                onClick={roll}
            >
                {hasWon ? 'Play Again' : 'Roll'}
            </RollBtn>
        </Main>
    )
}