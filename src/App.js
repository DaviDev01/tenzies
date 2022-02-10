import React, {useRef} from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import SoloMode from './components/SoloMode'
import TwoPlayerMode from './components/TwoPlayerMode'
import AgainstPcMode from './components/AgainstPcMode'
import {Routes, Route} from "react-router-dom"
import {OuterContainer} from './components/styled/styledComponents'

export default function App() {
    const confettiRef = useRef(null)
    
    return (
        <OuterContainer ref={confettiRef}>
            <Header/>
            <Routes>
                <Route path="/" element={<SoloMode confettiRef={confettiRef}/>}/>
                <Route path="/twoplayermode" element={<TwoPlayerMode confettiRef={confettiRef}/>}/>
                <Route path="/againstpcmode" element={<AgainstPcMode confettiRef={confettiRef}/>}/>
            </Routes>
            <Footer />
        </OuterContainer>
    )
}

