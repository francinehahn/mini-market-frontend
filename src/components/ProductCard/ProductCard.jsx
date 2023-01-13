import React from "react"
import { Container } from "./style"
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'


export function ProductCard (props) {
    const productsInCart = JSON.parse(localStorage.getItem("products"))

    const handleRemoveProduct = () => {
        const filterProducts = productsInCart.filter(item => item.product !== props.name)
        localStorage.setItem("products", JSON.stringify(filterProducts))
        props.setReload(!props.reload)
    }
   
    return (
        <Container>
            <p>{props.name}</p>
            <div>
                <AiOutlineMinusCircle onClick={props.handleReduceQty}/>
                <p>{props.qty}</p>
                <AiOutlinePlusCircle onClick={props.handleIncreaseQty}/>
            </div>
            <p>R${props.price.toFixed(2).replace(".", ",")}</p>
            <button onClick={handleRemoveProduct}>Remover</button>
        </Container>
    )
}