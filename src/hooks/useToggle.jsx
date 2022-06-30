import { useState } from "react"

export function useToggle(_default) {

    const [status,setStatus] = useState( _default || false )
    const toggleStatus = ()=> {setStatus(prevState => !prevState)}

    return [status,toggleStatus]
}