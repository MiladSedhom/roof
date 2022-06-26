import styled from "styled-components"
import Link from "./Link"


export default function BookmarksBar(props) {
    return (
        <StyledDiv>
            {props.data.bookmarks.map(bookmark => <Link key={bookmark.name} {...bookmark} /> )}
        </StyledDiv>
    )

}


const StyledDiv = styled.div`
    background-color: #383838;
    height: 2.5rem;
    display: flex;
    align-items: center;
    border: 1px solid black;

`