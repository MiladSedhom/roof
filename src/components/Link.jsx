import styled from 'styled-components'

export default function Link(props) {
    
    return(
        <A color={props.color} href={props.url}> {props.name} </A>
    )
}

const A = styled.a`
    text-decoration: none;
    background-color: ${props => props.color || "darkgrey"};
    color: white;
    padding: 0.25em 1em;
    border-radius: 10rem;
    margin: 0.5em;
    outline: 2px solid black;
    
`