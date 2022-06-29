import styled from "styled-components"

export default function Prefix (props) {
    const {name, textColor, backgroundColor} = props

    return (
        <StyledSpan backgroundColor={backgroundColor} textColor={textColor} >{name}</StyledSpan>)
}

const StyledSpan = styled.span`
    background-color:${ props => props.backgroundColor || "darkgrey" };
    color:${ props => props.textColor || "white" };
    border-radius:10rem;
    padding: 0.25em 0.5em;
    margin: 0 0 0 1em;
    align-self: center;
    flex-shrink: 0;
`