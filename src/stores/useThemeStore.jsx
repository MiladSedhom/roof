import makeStore from "../hooks/makeStore"

const reducer = (state, action) => {
	switch (action.type) {
		case "update":
			return action.payload.newTheme
		case "upload": {
			return action.payload.uploadedThemes
		}
		default:
			return state
	}
}

const intialTheme = {
	backgroundColor: "#B5A484",
	containersColor: "#383535",
	primaryColor: "#F5DEB3",
	secondaryColor: "#514F4D",
}

const [ThemeProvider, useThemeStore, useThemeDispatch] = makeStore(reducer, intialTheme, "roofTheme")

export { ThemeProvider, useThemeStore, useThemeDispatch }
