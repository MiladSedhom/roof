import styled from "styled-components"
import Accordion from "./Accordion"

export default function OthersContainer ({bookmarksFolders}) {

    return (
        <StyledDiv>
            {Object.keys(bookmarksFolders).map((key)=><Accordion bookmarksList={bookmarksFolders[key]} folderName={key} />)}
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