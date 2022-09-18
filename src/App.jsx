import styled, { createGlobalStyle } from "styled-components"
import BookmarksBar from "./pages/app/BookmarksBar/BookmarksBar"
import SearchBar from "./pages/app/SearchBar/SearchBar"
import { DATA } from "../data"
import { useToggle } from "./hooks/useToggle"
import { useLocalStorage } from "./hooks/useLocalStorage"
import SettingsModal from "./pages/app/SettingsModal/SettingsModal"
import { ThemeContext, theme } from "./contexts/ThemeContext"
import { useReducer } from "react"
import { useEffect } from "react"

let renderCount = 1

function App() {
	console.log(renderCount)
	renderCount++

	const reducer = (state, action) => {
		const addBookmark = (state, newBookmark) => {
			return {
				...state,
				count: state.count + 1,
				bookmarks: [...state.bookmarks, newBookmark],
			}
		}
		const deleteBookmark = (state, id) => {
			let updatedBookmarks = state.bookmarks.filter(element => element.id !== id && element.parentId !== id)
			return { ...state, bookmarks: updatedBookmarks }
		}
		const updateBookmark = (state, newBookmark) => {
			let updatedBookmarks = state.bookmarks.map(bookmark => {
				if (bookmark.id === newBookmark.id) return newBookmark
				return bookmark
			})

			return { ...state, bookmarks: updatedBookmarks }
		}
		switch (action.type) {
			case "addBookmark": {
				return addBookmark(state, action.payload.bookmark)
			}
			case "deleteBookmark": {
				return deleteBookmark(state, action.payload.id)
			}
			case "updateBookmark": {
				return updateBookmark(state, action.payload.bookmark)
			}
			case "uploadJSON": {
				return action.payload.uploadedJSON
			}
			default:
				return state
		}
	}

	const [storedRoofData, setStoredRoofData] = useLocalStorage("roofData", DATA)
	const [roofData, dispatch] = useReducer(reducer, storedRoofData)

	useEffect(() => {
		setStoredRoofData(roofData)
	}, [roofData])

	const [isSettings, toggleIsSettings] = useToggle(false)

	return (
		<div className="App">
			<GlobalStyle />

			<ThemeContext.Provider value={theme}>
				<StyledApp>
					<BookmarksBar roofData={roofData} dispatch={dispatch} toggleIsSettings={toggleIsSettings} />

					<Container>
						{isSettings && (
							<SettingsModal roofData={roofData} dispatch={dispatch} toggleIsSettings={toggleIsSettings} />
						)}
						<SearchBarLogoContainer>
							<Logo>Roof</Logo>
							<SearchBar defaultSearchEngine={roofData.defaultSearchEngine} shortcuts={roofData.shortcuts} />
						</SearchBarLogoContainer>
					</Container>
				</StyledApp>
			</ThemeContext.Provider>
		</div>
	)
}

export default App

const StyledApp = styled.div`
	background: #b5a484; /*#888888; */
	height: 100vh;
	position: relative;
`

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 2.5rem);
`

const SearchBarLogoContainer = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 0 0 10rem 0;
`
const Logo = styled.p`
	font-family: Fascinate;
	font-size: 3rem;
	margin: 1rem;
	color: ${theme.containersColor};
`

const GlobalStyle = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #484848;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #2f2f2f;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #212020;
}
`
