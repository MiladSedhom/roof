import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import BookmarksBar from './pages/app/BookmarksBar/BookmarksBar'
import SearchBar from './pages/app/SearchBar/SearchBar'
import OthersContainer from "./pages/app/BookmarksBar/OthersContainer"
import BackDrop from './components/BackDrop/BackDrop'
import { DATA } from '../data'
import { useToggle } from './hooks/useToggle'
import { useLocalStorage } from './hooks/useLocalStorage'
import AddBookmarkForm from './pages/app/BookmarksBar/AddBookmarkForm'
import SettingsPage from './pages/app/SettingsModal/SettingsModal'
import FileUpload from './components/FileUpload'
import { getFolders } from './pages/app/BookmarksBar/helpers'


function App() {
  const [data, setData] = useLocalStorage("roofData")
  const [isOthers, setIsOthers] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [isSettings, toggleIsSettings] = useToggle(true)

  return (
    <div className="App">
      <GlobalStyle />
      <StyledApp >
        <BookmarksBar data={data ? data : DATA} setIsOthers={setIsOthers} setIsAdd={setIsAdd} />
        {isOthers && <OthersContainer bookmarksOthers={data ? data.bookmarks.others : DATA.bookmarks.others} />}
        {isAdd && <AddBookmarkForm setData={setData} foldersList={getFolders(data)} />}
        <Container>
          <FileUpload setData={setData} />
          <SearchBarLogoContainer>
            <Logo>Roof</Logo>
            <SearchBar defaultSearchEngine={data.defaultSearchEngine || DATA.defaultSearchEngine} shortcuts={data.shortcuts || DATA.shortcuts} />
          </SearchBarLogoContainer>
        </Container>
      </StyledApp>
    </div>
  )
}

export default App

const StyledApp = styled.div`
  background: #B5A484;   /*#888888; */
  height: 100vh;
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
  color: #333333
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