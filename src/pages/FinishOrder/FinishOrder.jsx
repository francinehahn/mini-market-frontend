import React from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { Container } from "./style"


export function FinishOrder () {
    const navigate = useNavigate()
    
    return (
        <>
            <Header/>

            <Container>
                <h2>Compra realizada com sucesso!</h2>
                <button onClick={() => navigate("/")}>Página inicial</button>
            </Container>
        </>
    )
}