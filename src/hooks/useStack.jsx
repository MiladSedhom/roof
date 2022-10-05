import { useState } from "react"

export function useStack(initialValue) {
	if (!Array.isArray(initialValue)) {
		throw "initialValue is not an array"
	}

	const [stack, setStack] = useState(initialValue)

	const push = newElement => {
		setStack(prevQueue => [...prevQueue, newElement])
	}

	const pop = () => {
		const lastElement = stack[stack.length - 1]
		setStack(prevQueue => prevQueue.slice(0, -1))
		return lastElement
	}

	return { stack, push, pop }
}
