import { useState } from "react";
import styled from "styled-components";
import Prefix from "./Prefix";

export default function SearchBar(props) {
  const {defaultSearchEngine, shortcuts} = props
  const [currentUsedShortcut, setCurrentUsedShortcut] = useState(defaultSearchEngine.shortcut)
  const [inputText,setInputText] = useState("")

  const onChangeHandler = (e) => {
    setInputText(e.target.value)
  }

  const submitHandler = (e) => {

    if (e.key ===" "){
      e.preventDefault() 
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
        {currentUsedShortcut && <Prefix {...shortcuts[currentUsedShortcut]} />}

        <Input  value={inputText}
          type="search"
          onChange={(e) => { onChangeHandler(e) }}
          onKeyDown={(e) => { submitHandler(e) }}
          placeholder={"Search with " + (currentUsedShortcut ? shortcuts[currentUsedShortcut].name : defaultSearchEngine.name) + "..."}
        />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  max-width: 600px;
  min-width: 300px;
  height: 3rem;
  border: 2px solid black;
  border-radius: 10rem;
  background-color: wheat;
  `;

const Input = styled.input`
  width: 100%;
  padding: 0 1em;
  border: none;
  border-radius: 10rem;
  background-color: wheat;
  color: black;
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
`;