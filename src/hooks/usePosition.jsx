import { useEffect } from "react";
import { useState } from "react";

export function usePosition(ref) {
	const [left, setLeft] = useState();
	const [top, setTop] = useState();
	const [width, setWidth] = useState();
	const [height, setHeight] = useState();

	const getPosition = () => {
		const { left, top } = ref.current && ref.current.getBoundingClientRect();

		setLeft(left + window.scrollX);
		setTop(top + window.scrollY);
		setWidth(ref.current && ref.current.clientWidth);
		setHeight(ref.current && ref.current.clientHeight);
	};

	useEffect(() => {
		getPosition();

		window.addEventListener("resize", getPosition);

		return () => {
			window.removeEventListener("resize", getPosition);
		};
	}, []);

	return { left, top, width, height };
}
