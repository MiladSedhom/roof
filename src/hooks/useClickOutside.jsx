import { useEffect } from "react";

export const useClickOutside = (ref, callback) => {
	const handleClick = e => {
		if (!ref?.current?.contains(e.target) && callback) {
			callback(e);
		}
	};
	useEffect(() => {
		document.addEventListener("click", handleClick, true);
		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, []);
};
