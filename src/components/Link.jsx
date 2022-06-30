import styled from "styled-components";

export default function Link(props) {
  const {name, ...restOfProps} = props
  return (
    <A {...restOfProps} href={props.url}>
      {props.name}
    </A>
  );
}

const A = styled.a`
  padding: 0.25em 1em;
  margin: 0.5em;
  border-radius: 10rem;
  outline: 2px solid black;
  background-color: ${props => props.color || "wheat"};
  color: ${props => props.textColor || "black"};
  font-size: ${props => props.fontSize || "14px"};
  font-family: "Inter", sans-serif;
  font-weight: 500;
  text-decoration: none;
`;
