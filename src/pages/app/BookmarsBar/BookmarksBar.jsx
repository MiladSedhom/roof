import styled from "styled-components";
import Link from "./Link";
import Button from "./Button";

export default function BookmarksBar(props) {
  
  const addBookmark = (e)=>{
    props.toggleIsAdd()
  }

  return (
    <StyledDiv>
      <Container>
        {props.data.bookmarks.bookmarksBar.map((bookmark) => (
          <Link key={bookmark.name} {...bookmark}> {bookmark.name} </Link>
        ))}
      </Container>
      <Container>
        <Button onClick={addBookmark} > add bookmark </Button>
        <Button onClick={props.toggleIsOthers} > Others </Button>
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
