import React from 'react'
import {FooterStyled, SocialsUl, SocialsLI, SocialIcon} from './styled/styledComponents'


export default function Footer() {
    return (
        <FooterStyled /* className="footer" */>
            <div /* className="footer--info" inexistent in the css file*/>
                <SocialsUl /* className="social--ul" */>
                    <SocialsLI /* className="social--li" */><a href="https://github.com/DaviDev01" rel="noreferrer" target="_blank"><SocialIcon className="fab fa-github-square"></SocialIcon></a></SocialsLI>
                    <SocialsLI /* className="social--li" */><a href="https://www.linkedin.com/in/davi-mendes-868b6b207/" rel="noreferrer" target="_blank"><SocialIcon className="fab fa-linkedin"></SocialIcon></a></SocialsLI>
                    <SocialsLI /* className="social--li" */><a href="https://twitter.com/DavidaviMendes" rel="noreferrer" target="_blank"><SocialIcon className="fab fa-twitter-square"></SocialIcon></a></SocialsLI>
                </SocialsUl>
            </div>
        </FooterStyled>
    )
}