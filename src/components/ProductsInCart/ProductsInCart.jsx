import React from "react"
import { ProductCard } from "../ProductCard/ProductCard"
import { useRequestData } from "../../hooks/useRequestData"
import { Container } from "./style"


export function ProductsInCart (props) {
    let productsInCart = JSON.parse(localStorage.getItem("products"))
    const [stockData] = useRequestData('https://mini-market.onrender.com/products/stock')

    //Function that increases or decreases the units of the product in the cart
    const handleChangeQty = (name, type) => {
        let updatedArray = []

        const getStock = stockData && stockData.filter(item => item.name === name)[0]      
        
        for (let product of productsInCart) {
            let newQty = 0

            if (type === "reduce" && product.qty > 1) {
                newQty = Number(product.qty) - 1 
            } else if (type === "increase" && getStock.qty_stock > product.qty) {
                newQty = Number(product.qty) + 1
            } else {
                newQty = product.qty
            }

            if (product.product === name) {
                updatedArray.push({
                    id: product.id,
                    product: product.product,
                    qty: newQty,
                    price: (product.price / product.qty) * newQty
                })
            } else {
                updatedArray.push(product)
            }
        }

        localStorage.setItem("products", JSON.stringify(updatedArray))
        props.setReload(!props.reload)
    }

    //Function that calculates the total price of the items added to cart
    const totalPrice = () => {
        let sum = 0
        for (let product of productsInCart) {
            sum += product.price
        }
        return sum.toFixed(2).replace(".", ",")
    }

    return (
        <Container>
            {productsInCart !== null && productsInCart.length > 0 && (
                <>
                    <h3>Produtos selecionados</h3>
                    {productsInCart.map((item, index) => {
                        return <ProductCard
                            key={index}
                            name={item.product}
                            qty={item.qty}
                            price={item.price}
                            handleReduceQty={() => handleChangeQty(item.product, "reduce")}
                            handleIncreaseQty={() => handleChangeQty(item.product, "increase")}
                            reload={props.reload}
                            setReload={props.setReload}
                        />
                    })}
                    <p id="totalPrice">TOTAL: R${totalPrice()}</p>
                </>
            )}
        </Container>
    )
}