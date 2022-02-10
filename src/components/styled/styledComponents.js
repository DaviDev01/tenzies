import styled from 'styled-components'

export const OuterContainer = styled.div`
display: flex;
flex-direction: column;
gap: 42px;
width: 100%;
`

export const Main = styled.main`
background-color: #F5F5F5;
max-width: 800px;
min-height: fit-content;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0 25px;
align-self: center;
box-shadow: 2px 2px 8px 3px rgb(0 0 0 / 25%);
margin: 50px 0;

background: ${({player1Turn}) => {
    if (player1Turn) {
        return 'rgb(245,245,245)'
    } else {
        return 'rgb(245,245,245)'
    }
}};
background: ${({player1Turn}) => {
    if (player1Turn) {
        return 'linear-gradient(180deg, rgba(245,245,245,1) 94%, rgba(80,53,255,1) 105%)' 
    } else {
        return 'linear-gradient(360deg, rgba(245,245,245,1) 94%, rgba(255,60,53,1) 110%)'
    }
}};

@media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
    height: 900px;
    width: 800px;
    margin: 200px 0;
}

@media (min-width: 760px) and (min-height: 1000px) {
    margin: 130px 0;
}
`

export const LockBtn = styled.button`
background-color: #ff3c35;
border: none;
box-shadow: 0px 3.2px 7.68px rgba(0, 0, 0, 0.18);
border-radius: 5px;
max-width: 100px;
padding: 10px 40px;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 25px;
margin-top: 25px;

&:active {
    box-shadow: inset 2px 2px 5px 3px rgb(0 0 0 / 55%);
}

@media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
    display: flex;
    align-items: center;
    justify-content: center;
}
`

export const RollBtn = styled(LockBtn)`
background-color: #5035FF;
padding: 13px 45px;
color: #fff;
font-weight: 600;
font-size: 25px;
font-family: 'Karla', sans-serif;
margin-bottom: 34px;
margin-left: unset;
max-width: unset;
`    

export const DiceContainerTitle = styled.h1`
color: #2B283A;
font-size: 45px;
margin: 39px 0 0 0;
`

export const DiceContainerInstructions = styled.p`
font-family: 'Inter', sans-serif;
color: #4A4E74;
font-size: 20px;
max-width: 370px;
text-align: center;
margin: 0 0 15px 0;
`

export const DicePlayerOne = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 30px;
max-width: 550px;
margin-top: 25px;

media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
    max-width: 100%;
}
`

export const LockBtnBlue = styled(LockBtn)`
    background-color: #5035FF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
    margin-top: 25px;
`
export const LockImg = styled.img`
    width: 100%;

    @media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
        width: 200%;
        margin: 0px 150px;
    }
`

export const DicePlayerTwo = styled(DicePlayerOne)`
    padding-bottom: 25px;
    border-bottom: #ff3c35 solid;
`

export const RobotImg = styled.img`
margin-bottom: 15px;
margin-top: 20px;
` 

export const HeaderStyled = styled.header`
    align-self: stretch;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px;
    box-shadow: 2px 2px 8px 4px rgb(0 0 0 / 15%);

    @media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
        flex-direction: row;
    }

    
    @media (min-width: 700px) {
        flex-direction: row;
    }
`

export const HeaderTitle = styled.h3`
    color: #2B283A;
    font-size: 35px;
    margin: 0;
    text-shadow: 2px 2px  0px rgb(0 0 0 / 25%);
    cursor: pointer;

    @media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
        font-size: 70px;
    }
`

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    margin-bottom: 15px;

    @media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
        flex-direction: row;
        gap: 30px;
        padding-bottom: 30px;
    }

    @media (min-width: 700px) {
        flex-direction: row;
        margin: 0;
    }
`

export const NavLi = styled.li`
    font-size: 16px;
    font-family: 'Karla', sans-serif;
    color: #2B283A;
    text-transform: uppercase;
    font-weight: 700;
    justify-self: center;
    align-self: center;
    text-align: left;
    opacity: .9;
    cursor: pointer;
    display: block;
    box-shadow: 2px 2px 0px 3px rgb(0 0 0 / 15%);
    padding: 0 4px 0 4px;
    border-radius: 2px;
    transition: all .2s ;
    box-sizing: border-box;
    border-bottom: solid 2px ${ ({pathName, location}) => pathName !== location ? 'unset' : '#2b283aa8'}};
    pointer-events: none;
    
    &:hover,
    &:focus {   
        transform: scale(1.08);
        opacity: 1;
    }

    @media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
        font-size: 30px;
    }
`

export const UlStyled = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4em;

    @media (min-width: 500px) {
        flex-direction: row;
    }
`

export const FooterStyled = styled.footer`
display: flex;
justify-content: center;
align-items: center;
height: 100px;
margin: 0;
background-color: #F5F5F5;
margin-top: auto;
`

export const SocialsUl = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    gap: 50px;
`

export const SocialsLI = styled.li`
    font-size: 30px;    

    @media (min-width: 1010px) and (min-height: 1360px), (min-height: 1010px) and (min-width: 1360px) {
        font-size: 50px;
    }
`

export const SocialIcon = styled.i`
    color: #5035FF;

    $:hover {
        color: #231770;
    }

`