import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FinishOrder } from "../pages/FinishOrder/FinishOrder"
import { Home } from "../pages/Home/Home"


export function Router () {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/pedido-finalizado" element={<FinishOrder/>}/>
            </Routes>
        </BrowserRouter>
    )
}