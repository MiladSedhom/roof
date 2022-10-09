import styled, { createGlobalStyle } from "styled-components"
import { useStack } from "../../hooks/useStack"
import { useToggle } from "../../hooks/useToggle"
import { useThemeStore } from "../../stores/useThemeStore"
import BookmarksBar from "./BookmarksBar/BookmarksBar"
import SearchBar from "./SearchBar/SearchBar"
import SettingsModal from "./SettingsModal/SettingsModal"
import { BookmarksProvider } from "../../stores/useBookmarksStore"
import { ShortcutsProvider } from "../../stores/useShortcutStore"
import { useEffect } from "react"

let renderCount = 1

export default function AppPage() {
	console.log(renderCount)
	renderCount++

	const [isSettings, toggleIsSettings] = useToggle(false)
	const undoStack = useStack([])
	const redoStack = useStack([])

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<BookmarksProvider>
					<BookmarksBar toggleIsSettings={toggleIsSettings} />
				</BookmarksProvider>

				<ShortcutsProvider>
					{isSettings && (
						<SettingsModal toggleIsSettings={toggleIsSettings} undoStack={undoStack} redoStack={redoStack} />
					)}
					<Container>
						<SearchBarLogoContainer>
							<Logo>Roof</Logo>
							<SearchBar />
						</SearchBarLogoContainer>
					</Container>
				</ShortcutsProvider>
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	background-color: ${props => {
		const theme = useThemeStore()
		return theme.backgroundColor
	}};
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
	color: ${props => {
		const theme = useThemeStore()
		return theme.containersColor
	}};
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
