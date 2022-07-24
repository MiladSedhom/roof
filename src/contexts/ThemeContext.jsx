import { createContext } from "react";

export const theme = {
	backgroundColor: "",
	containersColor: "#383535",
	fieldsColor: "#514F4D",
	primaryColor: "#F5DEB3",
};

export const ThemeContext = createContext(theme);
