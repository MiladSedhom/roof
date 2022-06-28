import styled from "styled-components";

export default function SearchBar(props) {
  const {searchEngine, prefixes} = props

  const submitHandler = (e) => {
    let text = e.target.innerText;
    let prefix = text.split(/\s/g)[0]

    if (e.key === " ") {
      if (prefix in prefixes) {
        const newInnerHTML = turnPrefixToSpan(prefix,text,prefixes);
        putTextIntoElement(newInnerHTML, e);
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (prefix in prefixes) {
        //removing the prefix from the text
        text = text.replace(prefix, "");
        const url = prefixes[prefix].url.replace("%query", text);
        window.location.href = url;
        return;
      }
      window.location.href = `https://www.google.com/search?q=${text}`;
    }
  };

  return (
    <StyledDiv>
      <EditableDiv
        contentEditable
        onKeyDown={(e) => {
          submitHandler(e);
        }}
        placeholder={"Search with " + searchEngine + "..."}
      ></EditableDiv>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 40%;
  max-width: 600px;
  height: 3rem;
  border: 2px solid black;
  border-radius: 100rem;
  background-color: wheat;
  display: flex;
  align-items: center;
`;

const EditableDiv = styled.div`
  width: 100%;
  color: black;
  font-size: 1.2rem;
  padding: 0 2em;
  &:focus {
    outline: none;
  }
  &:empty::before {
    content: attr(placeholder);
  }
`;

const turnPrefixToSpan = (prefix, text, prefixesData) => {
  const newHtml = text.replace(prefix,
    `<span contenteditable="false" 
    style="
    background-color:${prefixesData[prefix].backgroundColor};
    color:${prefixesData[prefix].textColor};
    border-radius:5px;
    padding:0 0.25rem">
    ${prefix}</span>`);
  return newHtml;
};

const putTextIntoElement = (text, e) => {
  e.target.innerHTML = text;
  document.execCommand("selectAll", false, null);
  document.getSelection().collapseToEnd();
};
