import styled from "styled-components";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useContext } from "react";

export default function BookmarksBar({data,setIsAdd,setIsOthers,toggleIsSettings}) {
  
  const theme = useContext(ThemeContext)

  const toggleSettings = (e)=>{
    toggleIsSettings()
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
    <StyledDiv backgroundColor={theme.containersColor} >

      <Container>
        {data.bookmarks[0].children.map((bookmark) => {
          if (bookmark.type === "link") {
            return <Link key={bookmark.name} {...bookmark}> {bookmark.name} </Link>
          }
        })
        }
      </Container>

      <Container>
        <Button onClick={toggleAddBookmarkContainer} backgroundColor={theme.fieldsColor}  > + </Button>
        <Button onClick={toggleOthersContainer} backgroundColor={theme.fieldsColor}  > Others </Button>
        <Button onClick={toggleSettings} backgroundColor={theme.fieldsColor}  > settings </Button>
      </Container>

    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  background-color: ${props=> props.backgroundColor || "#383535 "};
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;
