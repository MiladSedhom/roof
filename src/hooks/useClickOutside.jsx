import { useEffect } from "react"

export const useClickOutside = (ref, callback) => {
	const handleClick = e => {
		if (!ref?.current?.contains(e.target) && callback) {
			e.preventDefault()
			callback(e)
			e.stopPropagation()
		}
	}
	useEffect(() => {
		document.addEventListener("click", handleClick, true)
		document.addEventListener("contextmenu", handleClick, true)
		return () => {
			document.removeEventListener("click", handleClick, true)
			document.removeEventListener("contextmenu", handleClick, true)
		}
	}, [])
}
