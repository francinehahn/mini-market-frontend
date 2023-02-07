import React, { useState } from "react"
import { Container } from "./style"
import { validateName } from "../../constants/constants"
import { useNavigate } from "react-router-dom"
import { useRequestData } from "../../hooks/useRequestData"
import { useForm } from "../../hooks/useForm"
import axios from "axios"
import { Loading } from "../Loading/Loading"


export function Form (props) {
    const [clientNameErrorMessage, setClientNameErrorMessage] = useState("")
    let productsInCart = JSON.parse(localStorage.getItem("products"))
    const [isLoadingOrder, setIsLoadingOrder] = useState(false)
    const navigate = useNavigate()

    const [form, onChange, clearInputs] = useForm({clientName: "", product: "", qty: 1, deliveryDate: ""})

    const [clientData, isLoadingClient, errorClient] = useRequestData('https://mini-market.onrender.com/clients')
    const [productData, isLoadingProduct, errorProduct] = useRequestData('https://mini-market.onrender.com/products')
    const [stockData] = useRequestData('https://mini-market.onrender.com/products/stock')

    const selectClient = clientData && form.clientName && clientData.find(data => data.name === form.clientName)


    //Function that submits OR registers the client name
    const handleSubmitName = (e) => {
        e.preventDefault()

        if (validateName(form.clientName)) {
            localStorage.setItem("products", JSON.stringify([]))
            localStorage.setItem("name", form.clientName)
            props.setReload(!props.reload)

            if (!selectClient) {
                const body = {name: form.clientName}
                axios.post('https://mini-market.onrender.com/clients', body)
                .then(alert('Cliente cadastrado com sucesso'))
                .catch(error => alert(error.response))
            }
        } else {
            setClientNameErrorMessage("Nome inválido. Digite nome e sobrenome.")
        }
    }

    //Function that adds a product to the cart
    const handleAddProduct = (e) => {
        e.preventDefault()
        props.setReload(!props.reload)
        
        if (form.qty < 1) {
            alert("A quantidade não pode ser menor do que 1.")
            return
        }

        const getStock = stockData && stockData.filter(item => item.name === form.product)[0]
        
        if (getStock.qty_stock < form.qty) {
            alert("Estoque indisponível.")
            return
        }

        const filterProduct = productData.filter(item => item.name === form.product)[0]
        
        let products = []
        if (productsInCart === null) {
            products = [{id: filterProduct.id, product: form.product, qty: form.qty, price: filterProduct.price * form.qty}]
            localStorage.setItem("products", JSON.stringify(products))
        } else {
            products = [...productsInCart, {id: filterProduct.id, product: form.product, qty: form.qty, price: filterProduct.price * form.qty}]
        }

        localStorage.setItem("products", JSON.stringify(products))
        clearInputs()
        props.setReload(!props.reload)
    }

    //Function that completes the order
    const handleOrder = (e) => {
        e.preventDefault()
        setIsLoadingOrder(true)
    
        if (form.deliveryDate === "") {
            alert("Selecione a data de entrega.")
            setIsLoadingOrder(false)

        } else {
            const findClientId = clientData.filter(item => item.name === localStorage.getItem("name"))[0]
            
            const products = []
            for (let product of productsInCart) {
                products.push({id: product.id, qty: product.qty})
            }

            const body = {
                "clientId": findClientId.id,
                "deliveryDate": form.deliveryDate,
                "products": products
            }

            axios.post('https://mini-market.onrender.com/orders', body).then(() => {
                localStorage.removeItem("products")
                localStorage.removeItem("name")
                navigate("/pedido-finalizado")
            }).catch(err => {
                alert(err.response.data)
                setIsLoadingOrder(false)
            })
        }
    }
    
    return (
        <Container>
            {productsInCart === null && (
                <>
                <section>
                    <label htmlFor="clientName">Nome do cliente</label>
                    <input type={'text'} value={form.clientName} id="clientName" name="clientName" list="clientData" onChange={onChange}/>
                    <datalist id="clientData">
                        {isLoadingClient && <option>Carregando...</option>}
                        
                        {!isLoadingClient && clientData && clientData.map((item, index) => {
                            return <option key={index}>{item.name}</option>
                        })}
                    </datalist>
                    <button type="button" onClick={handleSubmitName}>{selectClient? 'Entrar' : 'Cadastrar'}</button>
                </section>

                <span>{clientNameErrorMessage}</span>
                </>
            )}

            {productsInCart && <h3>Cliente: {localStorage.getItem("name")}</h3>}

            {productsInCart !== null && (
                <section>
                    <label htmlFor="product">Produto</label>
                    <input type={'text'} value={form.product} id="product" name="product" list="productData" onChange={onChange}/>
                    <datalist id="productData">
                        {isLoadingProduct && <option>Carregando...</option>}
                        
                        {!isLoadingProduct && productData && productData.map((item, index) => {
                            return <option key={index}>{item.name}</option>
                        })}
                    </datalist>

                    <label htmlFor="qty">Quantidade</label>
                    <input type={'number'} value={form.qty} id="qty" name="qty" onChange={onChange}/>

                    <button type="button" onClick={handleAddProduct}>OK</button>
                </section>
            )}

            {productsInCart !== null && productsInCart.length > 0 && (
                <section>
                    <label htmlFor="deliveryDate">Data de entrega</label>
                    <input type={'date'} value={form.deliveryDate} id="deliveryDate" name="deliveryDate" onChange={onChange}/>
                    <button onClick={handleOrder}>{isLoadingOrder? <Loading/> : 'Confirmar pedido'}</button>
                </section>
            )}
        </Container>
    )
}