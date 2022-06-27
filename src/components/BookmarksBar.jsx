import styled from "styled-components";
import Link from "./Link";
import Button from "./Button";

export default function BookmarksBar(props) {
  return (
    <StyledDiv>
      <BookmarksContainer>
        {props.data.bookmarks.bookmarksBar.map((bookmark) => (
          <Link key={bookmark.name} {...bookmark} />
        ))}
      </BookmarksContainer>
      <Button> Others </Button>
      {/* <div>
        accordin
        accordin
      </div> */}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  background-color: #383838;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
`;

const BookmarksContainer = styled.div``;
