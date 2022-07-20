import { useState, useId } from "react"
import styled from "styled-components"
import Button from "../../../components/Button/Button"
import { replaceNestedProperty } from "./helpers"

export default function AddBookmarkForm({ setData, foldersList }) {

    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [target, setTarget] = useState("bookmarksBar")
    const [type, setType] = useState("link")
    const [backgroundColor, setBackgroundColor] = useState("#F5DEB3")
    const [textColor, setTextColor] = useState("#000000")


    function submitHandler(e) {
        e.preventDefault()
        const newBookmark = type === "folder"
            ? { type, url, name, color: backgroundColor, textColor, children: [] }
            : { type, url, name, color: backgroundColor, textColor, }

        if (target === "bookmarksBar") {
            setData((prevData) => {
                const newData = { ...prevData }
                newData.bookmarks.bookmarksBar = [...newData.bookmarks.bookmarksBar, newBookmark]
                return newData
            })
            return
        }
        setData((prevState) => {
            const folder = foldersList.filter(element => { return element.name === target })[0]
            const updatedFolder = { ...folder, children: [...folder.children, newBookmark] }
            replaceNestedProperty(prevState, folder, updatedFolder)
            return prevState
        })
        //TODO: validaton 
    }

    return (
        //TODO: extract components
        <StyledDiv>
            <Form action="none">
                <Input value={name}
                    onInput={(e) => { setName(e.target.value) }}
                    type="text" placeholder="Name" />
                {type === "link" ? <Input value={url}
                    onInput={(e) => { setUrl(e.target.value) }}
                    type="text" placeholder="url" /> : null}
                <div>
                    <label> location: </label>
                    <Select value={target} onChange={(e) => { setTarget(e.target.value) }} >
                        <option value="bookmarksBar">Bookmarks bar</option>
                        {foldersList.map((element) =>
                            <option value={element.name} key={useId()} > {element.name} </option>
                        )}
                    </Select>
                </div>
                <div>
                    <label> type: </label>
                    <Select value={type} onChange={(e) => { setType(e.target.value) }} >
                        <option value="link">Link</option>
                        <option value="folder">Folder</option>
                    </Select>
                </div>
                <div>
                    <Input value={backgroundColor}
                        onChange={(e) => { setBackgroundColor(e.target.value) }}
                        type="color" placeholder="background color" />
                    <Input value={textColor}
                        onInput={(e) => { setTextColor(e.target.value) }}
                        type="color" placeholder="text color" />
                </div>
                <Button onClick={(e) => { submitHandler(e) }}>Add</Button>
            </Form>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    position: absolute;
    right: 5rem;
    width: 15rem;
    max-height: 85vh;
    overflow-y: auto;
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #383535;
    color: white;
`

const Input = styled.input`
    background-color: #373737;
    border: 2px black solid;
    border-radius: 1rem;
    height: 2rem;
    padding: 0 0.5rem;
    color: white;
    margin: 0.5rem 0 0 0 ;
    &:focus{
        outline: none;
    }
`
const Select = styled.select`
    background-color: #373737;
    color: lightgray
`

const Form = styled.form`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;   
    width: 100%;
    height: 100%;
`