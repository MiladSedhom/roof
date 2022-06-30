import styled from "styled-components";
import Link from "./Link";
import Button from "./Button";

export default function BookmarksBar(props) {
  
  const onClickHandler = (e)=>{
    props.toggleIsOthers()
  }

  return (
    <StyledDiv>
      <BookmarksContainer>
        {props.data.bookmarks.bookmarksBar.map((bookmark) => (
          <Link key={bookmark.name} {...bookmark} />
        ))}
      </BookmarksContainer>
      <Button onClick={(e)=>{onClickHandler(e)} } > Others </Button>
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

const BookmarksContainer = styled.div`
  display: flex;
  align-items: center;
`;
