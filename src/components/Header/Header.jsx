import React from "react"
import { HeaderContainer } from "./style"
import logo from '../../assets/mini-market-logo.png'

export function Header () {
    return (
        <HeaderContainer>
            <img src={logo} alt={'Logo do mini market'}/>
        </HeaderContainer>
    )
}