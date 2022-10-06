import { useState } from "react"
import styled from "styled-components"
import { useShortcutsStore } from "../../../stores/useShortcutStore"
import { useThemeStore } from "../../../stores/useThemeStore"
import Prefix from "./Prefix"

export default function SearchBar({}) {
	const theme = useThemeStore()
	const shortcuts = useShortcutsStore().shortcuts
	const defaultSearchEngine = useShortcutsStore().defaultSearchEngine

	const [currentUsedShortcut, setCurrentUsedShortcut] = useState(defaultSearchEngine.shortcut)
	const [inputText, setInputText] = useState("")

	const onChangeHandler = e => {
		setInputText(e.target.value)
	}

	const onkeyDownHandler = e => {
		if (e.key === ";") {
			e.preventDefault()
			let prefix = e.target.value.split(";")[0]
			if (prefix in shortcuts) {
				setCurrentUsedShortcut(prefix)
				setInputText("")
			} else setInputText(inputText => inputText + ";")
		}

		if (e.key === "Backspace" && !inputText) {
			setCurrentUsedShortcut(null)
		}

		if (e.key === "Enter") {
			e.preventDefault()
			const target = e.ctrlKey ? "_newtab" : "_self"
			if (currentUsedShortcut) {
				window.open(shortcuts[currentUsedShortcut].url.replace("%QUERY", inputText), target)
				return
			}
			window.open(defaultSearchEngine.url.replace("%QUERY", inputText), target)
		}
	}

	return (
		<StyledDiv theme={theme}>
			{currentUsedShortcut && <Prefix {...shortcuts[currentUsedShortcut]} />}

			<Input
				value={inputText}
				type="search"
				onChange={e => {
					onChangeHandler(e)
				}}
				onKeyDown={e => {
					onkeyDownHandler(e)
				}}
				placeholder={
					"Search with " +
					(currentUsedShortcut ? shortcuts[currentUsedShortcut].name : defaultSearchEngine.name) +
					"..."
				}
				theme={theme}
			/>
		</StyledDiv>
	)
}

const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	width: 70%;
	max-width: 600px;
	min-width: 300px;
	height: 3rem;
	border: 2px solid black;
	border-radius: 10rem;
	background-color: ${props => props.theme.primaryColor};
`

const Input = styled.input`
	width: 100%;
	padding: 0 1em;
	border: none;
	border-radius: 10rem;
	background-color: ${props => props.theme.primaryColor};
	color: black;
	font-size: 1.2rem;
	&:focus {
		outline: none;
	}
`
