import { useState } from "react";

export function useLocalStorage(string) {
    const dataJSON = JSON.parse(localStorage.getItem(string))
    if (typeof dataJSON !== "object"){
        throw "no data in the local storage"
    }
    const [data,setState] = useState(dataJSON)

    const changeData = (input) => {
        let updatedData

        if (input instanceof Function) {
            updatedData = input(data)
        } else updatedData = input 

        if (typeof updatedData !== "object") {
            //TODO: handle this better
            console.log(updatedData," is no an object this may cause problems.")
            return
        }

        setState(updatedData)
        localStorage.setItem(string,JSON.stringify(updatedData))
    }

    return [data,changeData]
}