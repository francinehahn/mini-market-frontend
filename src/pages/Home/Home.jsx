import React, { useState, useEffect } from "react"
import { Form } from "../../components/Form/Form"
import { Header } from "../../components/Header/Header"
import { ProductsInCart } from "../../components/productsInCart/productsInCart"


export function Home () {
    const [reload, setReload] = useState(false)
    let productsInCart = JSON.parse(localStorage.getItem("products"))

    useEffect(() => {
        productsInCart = JSON.parse(localStorage.getItem("products"))
    }, [reload])

    return (
        <>
            <Header/>
            <ProductsInCart reload={reload} setReload={setReload}/>
            <Form reload={reload} setReload={setReload}/>
        </>
    )
}