import { useEffect } from "react"
import { useState } from "react"

export function usePosition(ref) {
	const [position, setPosition] = useState({})

	const getPosition = () => {
		const { left, top } = ref.current && ref.current.getBoundingClientRect()
		const width = ref.current && ref.current.clientWidth
		const height = ref.current && ref.current.clientHeight

		setPosition({ left, top, width, height })
	}

	useEffect(() => {
		getPosition()

		window.addEventListener("resize", getPosition)

		return () => {
			window.removeEventListener("resize", getPosition)
		}
	}, [])

	return position
}
