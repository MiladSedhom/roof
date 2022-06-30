import { useState } from 'react'
import styled,{ createGlobalStyle} from 'styled-components'
import BookmarksBar from './components/BookmarksBar'
import SearchBar from "./components/SearchBar"
import Accordion from './components/Accordion'
import { DATA } from '../data'
import { useToggle } from './hooks/useToggle'


function App() {
  const [isOthers,toggleIsOthers] = useToggle(false)

  return (
    <div className="App">
      <GlobalStyle />
      <StyledApp >
        <BookmarksBar data={DATA} toggleIsOthers={toggleIsOthers} />
        {/* <Accordion /> */}
        <Container>
          <SearchBarLogoContainer>
            <Logo>Roof</Logo>
            <SearchBar defaultSearchEngine={DATA.defaultSearchEngine} shortcuts={DATA.shortcuts} />
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
`