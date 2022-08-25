import { useState, useEffect } from "react";

const getSavedValue = (key, initialValue) => {
	const savedValue = JSON.parse(localStorage.getItem(key));
	if (savedValue) return savedValue;

	if (initialValue instanceof Function) return initialValue;
	return initialValue;
};

export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => getSavedValue(key, initialValue));

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
		console.log(value);
	}, [value]);

	return [value, setValue];
}
