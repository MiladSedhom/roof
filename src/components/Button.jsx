import styled from "styled-components";

export default function Button(props) {
  return <StyledButton {...props}> {props.children} </StyledButton>;
}

const StyledButton = styled.button`
  padding: 0.25em 1em;
  margin: 0.5em;
  border: none;
  border-radius: 10rem;
  outline: 2px solid black;
  background-color: ${(props) => props.color || "wheat"};
  color: ${props => props.textColor || "black"};
  font-size: ${(props) => props.fontSize || "14px"};
  font-family: "Inter", sans-serif;
  font-weight: 500;
  cursor: pointer;
`;
