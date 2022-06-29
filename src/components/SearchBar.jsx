import { useState } from "react";
import styled from "styled-components";
import Prefix from "./Prefix";

export default function SearchBar(props) {
  const {defaultSearchEngine, shortcuts} = props
  const [currentUsedShortcut, setCurrentUsedShortcut] = useState(defaultSearchEngine.currentUsedShortcut)
  const [inputText,setInputText] = useState("")

  const onChangeHandler = (e) => {
    setInputText(e.target.value)
  }

  const submitHandler = (e) => {

    if (e.key ===" "){
      e.preventDefault() //making the space dont actually m --going to read avout clean code
      let firstWord = e.target.value.split(/\s/g)[0] // /\s/g is a regex for white spaces
      if (firstWord in shortcuts) {
        setCurrentUsedShortcut( firstWord )
        setInputText("")
      }
      else setInputText((inputText)=>inputText+" ")
    }

    if (e.key==="Backspace" && !inputText){
      setCurrentUsedShortcut(null)
    }

    if (e.key === "Enter") {
      e.preventDefault()
      const target = e.ctrlKey ? "_newtab" : "_self"
      if (currentUsedShortcut) {
        window.open(shortcuts[currentUsedShortcut].url.replace("%query", inputText),target)
        return;
      }
      window.open(defaultSearchEngine.url.replace("%query",inputText),target)
    }
  };

  return (
    <StyledDiv>
      <Container>
        {currentUsedShortcut && <Prefix {...shortcuts[currentUsedShortcut]} />}

        <Input  value={inputText}
          type="search"
          onChange={(e) => { onChangeHandler(e) }}
          onKeyDown={(e) => { submitHandler(e) }}
          placeholder={"Search with " + (currentUsedShortcut ? shortcuts[currentUsedShortcut].name : defaultSearchEngine.name) + "..."}
        />
      </Container>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 70%;
  max-width: 600px;
  min-width: 300px;
  height: 3rem;
  border: 2px solid black;
  border-radius: 10rem;
  background-color: wheat;
  display: flex;
  align-items: center;
  `;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  `

const Input = styled.input`
  width: 100%;
  background-color: wheat;
  color: black;
  font-size: 1.2rem;
  border-radius: 10rem;
  border: none;
  padding: 0 1em;
  &:focus {
    outline: none;
  }
`;