import { createContext } from "react";

export const theme = {
  backgroundColor: "",
  primaryColor: "#383535",
  secondaryColor: "#514F4D",
  searchBar: "#F5DEB3",
};

export const ThemeContext = createContext(theme);
