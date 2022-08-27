import styled, { createGlobalStyle } from "styled-components";
import BookmarksBar from "./pages/app/BookmarksBar/BookmarksBar";
import SearchBar from "./pages/app/SearchBar/SearchBar";
import { DATA } from "../data";
import { useToggle } from "./hooks/useToggle";
import { useLocalStorage } from "./hooks/useLocalStorage";
import SettingsModal from "./pages/app/SettingsModal/SettingsModal";
import { ThemeContext, theme } from "./contexts/ThemeContext";
import { useReducer } from "react";
import { useEffect } from "react";

let renderCount = 1;

function App() {
	console.log(renderCount);
	renderCount++;

	const reducer = (state, action) => {
		const addBookmark = (state, newBookmark) => {
			return {
				...state,
				count: state.count + 1,
				bookmarks: [
					...state.bookmarks.map(bookmark => {
						if (bookmark.id === newBookmark.parentId) {
							return { ...bookmark, childrenIds: [...bookmark.childrenIds, newBookmark.id] };
						}
						return bookmark;
					}),
					newBookmark,
				],
			};
		};
		const deleteBookmark = (state, id) => {
			const parentId = state.bookmarks.find(element => element.id === id).parentId;

			let updatedBookmarks = state.bookmarks.filter(element => element.id !== id);
			updatedBookmarks = updatedBookmarks.map(element => {
				if (element.id === parentId) {
					element.childrenIds = element.childrenIds.filter(childId => childId !== id);
					return element;
				}
				return element;
			});
			return { ...state, bookmarks: updatedBookmarks, count: state.count - 1 };
		};
		const updateBookmark = (state, newBookmark) => {
			console.log("start");
			const id = newBookmark.id;
			console.log("new bookmark", newBookmark);
			console.log("id:", id);
			const oldParentId = state.bookmarks.find(element => element.id === id).parentId;
			const newParentId = newBookmark.parentId;

			let updatedBookmarks = state.bookmarks.map(bookmark => {
				if (bookmark.id === id) return newBookmark;
				if (oldParentId === newParentId) return bookmark;

				if (bookmark.id === oldParentId) {
					bookmark.childrenIds = bookmark.childrenIds.filter(childId => childId !== id);
					return bookmark;
				}
				if (bookmark.id === newParentId) {
					bookmark.childrenIds = [...bookmark.childrenIds, id];
					return bookmark;
				}
				return bookmark;
			});

			console.log("updated state", { ...state, bookmarks: updatedBookmarks });
			console.log("end");
			return { ...state, bookmarks: updatedBookmarks };
		};
		switch (action.type) {
			case "addBookmark": {
				return addBookmark(state, action.payload.bookmark);
			}
			case "deleteBookmark": {
				return deleteBookmark(state, action.payload.id);
			}
			case "updateBookmark": {
				return updateBookmark(state, action.payload.bookmark);
			}
			default:
				return state;
		}
	};

	const [data, setData] = useLocalStorage("roofData", DATA);
	const [roofData, dispatch] = useReducer(reducer, data);

	useEffect(() => {
		console.log("useEffect Start");
		console.log("data:", data);
		console.log("roofData: ", roofData);
		setData(roofData);
		console.log("data after setData:", data);
		console.log("useEffect End");
	}, [roofData]);

	const [isSettings, toggleIsSettings] = useToggle(false);

	return (
		<div className="App">
			<GlobalStyle />

			<ThemeContext.Provider value={theme}>
				<StyledApp>
					<BookmarksBar data={data} dispatch={dispatch} toggleIsSettings={toggleIsSettings} />

					<Container>
						{isSettings && <SettingsModal data={data} setData={setData} toggleIsSettings={toggleIsSettings} />}
						<SearchBarLogoContainer>
							<Logo>Roof</Logo>
							<SearchBar defaultSearchEngine={data.defaultSearchEngine} shortcuts={data.shortcuts} />
						</SearchBarLogoContainer>
					</Container>
				</StyledApp>
			</ThemeContext.Provider>
		</div>
	);
}

export default App;

const StyledApp = styled.div`
	background: #b5a484; /*#888888; */
	height: 100vh;
	position: relative;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 2.5rem);
`;

const SearchBarLogoContainer = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 0 0 10rem 0;
`;
const Logo = styled.p`
	font-family: Fascinate;
	font-size: 3rem;
	margin: 1rem;
	color: ${theme.containersColor};
`;

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
`;
