import styled from "styled-components"

export default function Prefix (props) {
    const {name, textColor, backgroundColor} = props

    return (
        <StyledSpan backgroundColor={backgroundColor} textColor={textColor} >{name}</StyledSpan>)
}

const StyledSpan = styled.span`
    align-self: center;
    flex-shrink: 0;
    padding: 0.25em 0.5em;
    margin: 0 0 0 1em;
    border-radius:10rem;
    background-color:${ props => props.backgroundColor || "darkgrey" };
    color:${ props => props.textColor || "white" };
`