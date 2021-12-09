import React from "react"

export default function Die(props) {
    let styles

    if (!props.hasWon && (props.twoPlayerMode || props.againstPC) && !props.player1Turn) {
        styles = {width: "14.6%"}
    } else if (props.player1Win) {
        styles = {width: "14.6%"}
    }

    return (
        <button 
            style={styles}
            className={`Die ${props.obj.isSelected && 'greenShadow'}`} 
            onClick={(e)=> props.hold(props.obj.id, e)}
            disabled={props.hasWon || props.player1Turn}
        >
            <img src={`../imgs/dice${props.obj.value}.png`} className="DieNum" alt={`dice${props.obj.value}`} />
        </button>
    )
}