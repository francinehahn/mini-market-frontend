import axios from "axios"
import { useEffect, useState } from "react"


export function useRequestData (url) {
    const [data, setData] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setIsLoading(false)
            setData(response.data)
        })
        .catch(error => {
            setIsLoading(false)
            setError(error.response)
        })
    }, [url])

    return [data, isLoading, error]
}