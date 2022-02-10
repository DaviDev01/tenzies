import React from "react"
import dice1 from "../imgs/dice1.png"
import dice2 from "../imgs/dice2.png"
import dice3 from "../imgs/dice3.png"
import dice4 from "../imgs/dice4.png"
import dice5 from "../imgs/dice5.png"
import dice6 from "../imgs/dice6.png"


export default function Die(props) {
    let styles

    function getImg() {
        return props.obj.value === 1 ? dice1 :
        props.obj.value === 2 ? dice2 :
        props.obj.value === 3 ? dice3 : 
        props.obj.value === 4 ? dice4 : 
        props.obj.value === 5 ? dice5 :
        dice6
    }

    if (!props.hasWon && !props.player1Turn) {
        styles = {width: "14.6%"}
    } else if (props.player1Win || !props.player1Turn) {
        styles = {width: "14.6%"}
    } 

    return (
        <button 
            style={styles}
            className={`Die ${props.obj.isSelected && 'greenShadow'}`} 
            onClick={(e)=> props.hold(props.obj.id, e)}
            disabled={props.hasWon || props.player1Turn}
        >
            <img src={getImg()} className="DieNum" alt={`dice${props.obj.value}`} />
        </button>
    )
}
