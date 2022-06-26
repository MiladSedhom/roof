import { useState } from 'react'
import styled from 'styled-components'
import BookmarksBar from './components/BookmarksBar'
import SearchBar from "./components/SearchBar"
import { DATA } from '../data'


function App() {

  return (
    <div className="App">
    <StyledApp >
      <BookmarksBar data={DATA} />
      <Container>
        <MainContainer>
            <Logo>Roof</Logo>
          <SearchBar searchEngine={DATA.searchEngine} />
        </MainContainer>
      </Container>
    </StyledApp>
    </div>
  )
}

export default App

const StyledApp = styled.div`
  background: #d7a42d;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 2.5rem);
`

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 0 10rem 0;
`
const Logo = styled.p`
  font-family: Fascinate;
  font-size: 3rem;
  margin: 1rem;
  color: #333333
`