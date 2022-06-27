import styled from "styled-components";

export default function Button(props) {
  return <StyledButton {...props}> {props.children} </StyledButton>;
}

const StyledButton = styled.button`
  background-color: ${(props) => props.color || "darkgrey"};
  font-size: ${(props) => props.fontSize || "14px"};
  color: white;
  padding: 0.25em 1em;
  border-radius: 10rem;
  margin: 0.5em;
  outline: 2px solid black;
  border: none;
`;
