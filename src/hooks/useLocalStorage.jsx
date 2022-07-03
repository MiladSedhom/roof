import { useState } from "react";

export function useLocalStorage(string) {
    const dataJSON = JSON.parse(localStorage.getItem(string))
    if (typeof dataJSON !== "object"){
        throw "no data in the local storage"
    }
    const [data,setState] = useState(dataJSON)

    const changeData = (object) => {
        if (typeof object !== "object") console.log(object," is no an object this may cause problems.")
        setState(object)
        localStorage.setItem(string,JSON.stringify(object))
    }

    return [data,changeData]
}