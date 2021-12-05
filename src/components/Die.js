import React from "react"

export default function Die(props) {

    return (
        <button 
            className={`Die ${props.obj.isSelected && 'greenShadow'}`} 
            onClick={(e)=> props.hold(props.obj.id, e)}
            disabled={props.hasWon}
        >
            <img src={`../imgs/dice${props.obj.value}.png`} className="DieNum" alt={`dice${props.obj.value}`} width="121%"/>
        </button>
    )
}