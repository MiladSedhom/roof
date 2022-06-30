import { useState } from "react"
import styled from "styled-components"
import { useToggle } from "../hooks/useToggle"
import Button from "./Button"
import Link from "./Link"

export default function Accordion({bookmarksList,folderName}) {
    const [isExpand,toggleIsExpand] = useToggle(true)

    return(
    <>
        <AccordionButton onClick={toggleIsExpand}>{folderName}<span>{isExpand?"-":"+"}</span></AccordionButton> 

        {isExpand && bookmarksList.map((bookmark) =>
        <AccordionLink url= {bookmark.url}>{bookmark.name}</AccordionLink>) }
    </>
    )
} 

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
const AccordionLink = styled(Link)`
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