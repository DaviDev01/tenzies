import React, {useState, useEffect} from "react"

export default function Die(props) {
    const [hideDice, setHideDice] = useState(false)

    useEffect( () => setHideDice(true), [] )
    
    let styles

    if (!props.hasWon && (props.twoPlayerMode || props.againstPC) && !props.player1Turn) {
        styles = {width: "80px", height: "80px"} 
    } else if (props.player1Win) {
        styles = {width: "80px", height: "80px"}
    }

    return (
        <button 
            style={styles}
            className={`Die ${props.obj.isSelected && 'greenShadow'}`} 
            onClick={(e)=> props.hold(props.obj.id, e)}
            disabled={props.hasWon || props.player1Turn}
        >
            {hideDice && !props.againstPC && props.player1Turn && !props.hasWon ? <h3>?</h3> :
            <img src={`../imgs/dice${props.obj.value}.png`} className="DieNum" alt={`dice${props.obj.value}`} />}
        </button>
    )
}