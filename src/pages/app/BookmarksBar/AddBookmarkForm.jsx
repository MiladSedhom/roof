import { useState } from "react"
import styled from "styled-components"
import Button from "../../../components/Button/Button"
import Input from "../../../components/Input/Input"
import ColorInput from "../../../components/ColorInput/ColorInput"
import Select from "../../../components/Select/Select"
import { replaceNestedProperty } from "./helpers"

export default function AddBookmarkForm({ setData, foldersList }) {

    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [target, setTarget] = useState("Bookmarks Bar")
    const [type, setType] = useState("link")
    const [backgroundColor, setBackgroundColor] = useState("#F5DEB3")
    const [textColor, setTextColor] = useState("#000000")


    function submitHandler(e) {
        e.preventDefault()
        const newBookmark = type === "folder"
            ? { type, url, name, backgroundColor, textColor, children: [] }
            : { type, url, name, backgroundColor, textColor, }

        setData((prevState) => {
            //its important to copy state so react does recongizr its not the same object ===> https://pgarciacamou.medium.com/react-doesnt-always-trigger-a-re-render-on-setstate-4644212560a?source=post_page-----86c00f9cf489----2---------------------------- 
            const newState ={...prevState}
            const folder = foldersList.filter(element => { return element.name === target })[0]
            const updatedFolder = { ...folder, children: [...folder.children, newBookmark] }
            replaceNestedProperty(newState, folder, updatedFolder)
            return newState
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
                    <Select label={"location: "} value={target} onChange={(e) => { setTarget(e.target.value) }} >
                        {foldersList.map((element) =>
                            <option value={element.name} key={element.name} > {element.name} </option>
                        )}
                    </Select>
                </div>

                <div>
                    <Select label={"type: "} value={type} onChange={(e) => { setType(e.target.value) }} >
                        <option value="link">Link</option>
                        <option value="folder">Folder</option>
                    </Select>
                </div>
                <div>
                    <ColorInput value={backgroundColor}
                        onChange={(e) => { setBackgroundColor(e.target.value) }}
                        type="color" placeholder="background color" />
                    <ColorInput value={textColor}
                        onInput={(e) => { setTextColor(e.target.value) }}
                        type="color" placeholder="text color" />
                </div>
                <Button style={{outline:"solid 2px black"}} onClick={(e) => { submitHandler(e) }}>Add</Button>
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

const Form = styled.form`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;   
    width: 100%;
    height: 100%;
`