import { useId } from "react";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";

export default function BookmarksBar({data,setIsAdd,setIsOthers}) {
  
  const addBookmark = (e)=>{
    props.toggleIsAdd()
  }

  const toggleOthersContainer =() => {
    setIsAdd(false)
    setIsOthers((prevState)=>!prevState)
  }

  const toggleAddBookmarkContainer =() => {
    setIsOthers(false)
    setIsAdd((prevState)=>!prevState)
  }

  return (
    <StyledDiv>

      <Container>
        {data.bookmarks[0].children.map((bookmark) => {
          if (bookmark.type === "link") {
            return <Link key={bookmark.name} {...bookmark}> {bookmark.name} </Link>
          }
        })
        }
      </Container>

      <Container>
        <Button onClick={toggleAddBookmarkContainer} > add bookmark </Button>
        <Button onClick={toggleOthersContainer} > Others </Button>
        <Button onClick={addBookmark} > settings </Button>
      </Container>

    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  background-color: #383535;
  height: 2.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-block: 2px solid black;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;
