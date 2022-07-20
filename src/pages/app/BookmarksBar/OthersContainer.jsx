import { useId } from "react"
import styled from "styled-components"
import Accordion, { AccordionLink } from "./Accordion"

export default function OthersContainer ({bookmarksOthers}) {

    return (
        <StyledDiv>
            {bookmarksOthers.map((element)=>{
                if (element.type === "folder")
                    return <Accordion notNested accordionChildren={element.children} name={element.name} key={element.name} >
                        {element.children}
                    </Accordion>
                if (element.type === "link")
                    return <AccordionLink url= {element.url} key={child.name}  > {child.name} </AccordionLink>
            }
            )}
        </StyledDiv>
        )
    }

const StyledDiv = styled.div`
    position: absolute;
    right: 0;
    width: 15rem;
    max-height: 85vh;
    overflow-y: auto;
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #383535;
`