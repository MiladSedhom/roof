import { useState } from "react"
import styled from "styled-components"
import { useToggle } from "../../../hooks/useToggle"
import Button from "./Button"
import Link from "./Link"

export default function Accordion({children,name,notNested}) {
    const [isExpand,toggleIsExpand] = useToggle(true)

    return(
    <Container notNested={notNested} >

        <AccordionButton onClick={toggleIsExpand}>{name}<span>{isExpand?"-":"+"}</span></AccordionButton> 
        {/* <Content> */}
            {isExpand && children.map((child) =>
            {
                if (child.type==="folder")
                return <Accordion children={child.children} name={child.name}/>
                if (child.type === "link")
                return <AccordionLink url= {child.url}>{child.name}</AccordionLink>
            })
        }
        {/* </Content> */}
         
    </Container>
    )
} 

const Container = styled.div`
    padding-left: ${props => props.notNested ? "" : "1.5rem"};
    border-left: ${props => props.notNested ? "" : "2px gray solid"};
`

const AccordionButton = styled(Button)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding:0;
    margin: 0.5rem 0 ;
    outline: none;
    background-color: #383535;
    color: white;
    font-weight: bold;
    font-size: 14px;
    `
export const AccordionLink = styled(Link)`
    width: 100%;
    margin: 0 0 0.5rem;
    padding: 0 0 0 1rem;
    display: block;
    outline: none;
    border-left: 2px gray solid ;
    border-radius: 0;
    background-color: #383535;
    color: white;
    font-size: 12px;
`
const content = styled.div`
    
`