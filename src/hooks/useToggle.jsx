import { useState } from "react";

export function useToggle(_default) {
	const [status, setStatus] = useState(_default || false);
	const toggleStatus = (boolean) => {
		if (boolean === true) {
			setStatus(true);
			return;
		}
		if (boolean === false) {
			setStatus(false);
			return;
		}
		setStatus((prevState) => !prevState);
	};

	return [status, toggleStatus];
}
