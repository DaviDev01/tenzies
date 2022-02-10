import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {HeaderStyled, HeaderTitle, Nav, NavLi, UlStyled} from './styled/styledComponents'

function Header(props) {
    let location = useLocation()

    return (
        <HeaderStyled /* className="mode" */>
            <Link to="/">
                <HeaderTitle>
                    Tenzies
                </HeaderTitle>
            </Link>
            <Nav /* className="btns" */>
                <UlStyled className="header--ul">
                    <Link to="/">
                        <NavLi pathName={"/"} location={location.pathname}>One Player</NavLi>
                    </Link>
                    <Link to="/twoplayermode">
                        <NavLi pathName={"/twoplayermode"} location={location.pathname}>Two Players</NavLi>
                    </Link>
                    <Link to="/againstpcmode">
                        <NavLi pathName={"/againstpcmode"} location={location.pathname}>Human vs Machine</NavLi>
                    </Link>
                </UlStyled>
            </Nav>
        </HeaderStyled>
    )
}

export default Header