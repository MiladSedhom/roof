import { useState } from "react"
import { useRef } from "react"
import { useClickOutside } from "../../../hooks/useClickOutside"
import { useForm } from "../../../hooks/useForm"
import { useThemeDispatch, useThemeStore } from "../../../stores/useThemeStore"
import styled from "styled-components"
import BackDrop from "../../../components/BackDrop/BackDrop"
import Button from "../../../components/Button/Button"
import ColorInput from "../../../components/ColorInput/ColorInput"
import FileUpload from "../../../components/FileUpload"
import { downloadJSON } from "./helper"
import { useBookmarksDispatch, useBookmarksStore } from "../../../stores/useBookmarksStore"
import { useShortcutsDispatch, useShortcutsStore } from "../../../stores/useShortcutStore"

export default function SettingsPage({ toggleIsSettings, undoStack, redoStack }) {
	const theme = useThemeStore()
	const themeDispatch = useThemeDispatch()
	const shortcuts = useShortcutsStore()
	const shortcutsDispatch = useShortcutsDispatch()
	const bookmarks = useBookmarksStore()
	const bookmarksDispatch = useBookmarksDispatch()

	const upload = uploadedObject => {
		console.log(uploadedObject)

		themeDispatch({ type: "upload", payload: { uploadedTheme: uploadedObject.theme } })
		console.log(theme)
		shortcutsDispatch({
			type: "upload",
			payload: {
				uploadedShortcuts: uploadedObject.shortcuts,
			},
		})
		bookmarksDispatch({
			type: "upload",
			payload: { uploadedBookmarks: uploadedObject.bookmarks },
		})
	}

	const clickOutsideRef = useRef()
	useClickOutside(clickOutsideRef, toggleIsSettings)

	const hiddenUploadRef = useRef(null)

	const colorsInitialValues = {
		backgroundColor: theme.backgroundColor,
		containersColor: theme.containersColor,
		primaryColor: theme.primaryColor,
		secondaryColor: theme.secondaryColor,
	}
	const [colorFormValues, setColorFormValues, colorsOnChange] = useForm(colorsInitialValues)

	return (
		<>
			<Wrapper>
				<BackDrop style={{ backgroundColor: "rgba(56,53,53,0.40)" }} />
				<SettingsContainer ref={clickOutsideRef} theme={theme}>
					<StyledSection>
						<StyledTitle>Data:</StyledTitle>
						<Container>
							<FileUpload callback={upload} innerRef={hiddenUploadRef} style={{ display: "none" }} />
							<StyledButton
								theme={theme}
								onClick={() => {
									console.log(hiddenUploadRef.current)
									hiddenUploadRef.current.click()
								}}
							>
								Upload
							</StyledButton>
							<StyledButton
								theme={theme}
								onClick={() => {
									const obj = { bookmarks: [...bookmarks], shortcuts: { ...shortcuts }, theme: { ...theme } }
									downloadJSON(obj, "roofData")
								}}
							>
								Download
							</StyledButton>
							<StyledButton theme={theme}>Share</StyledButton>
						</Container>
					</StyledSection>

					<StyledSection>
						<StyledTitle>Apperence:</StyledTitle>
						<Container>
							<StyledH3>Background color:</StyledH3>
							<ColorInput
								name="backgroundColor"
								value={colorFormValues.backgroundColor}
								type="color"
								onChange={e => {
									colorsOnChange(e)
								}}
							/>
						</Container>
						<Container>
							<StyledH3>Accent color:</StyledH3>
							<ColorInput
								name="primaryColor"
								value={colorFormValues.primaryColor}
								type="color"
								onChange={e => {
									colorsOnChange(e)
								}}
							/>
						</Container>
						<Container>
							<StyledButton
								theme={theme}
								onClick={() => {
									undoStack.push(theme)
									themeDispatch({ type: "update", payload: { newTheme: colorFormValues } })
								}}
							>
								Save
							</StyledButton>
							<StyledButton
								theme={theme}
								onClick={() => {
									const lastTheme = undoStack.pop()
									if (lastTheme) {
										redoStack.push(theme)
										themeDispatch({ type: "update", payload: { newTheme: lastTheme } })
										setColorFormValues(lastTheme)
									}
								}}
								disabled={undoStack.stack.length === 0}
							>
								Undo
							</StyledButton>
							<StyledButton
								theme={theme}
								onClick={() => {
									const nextTheme = redoStack.pop()
									if (nextTheme) {
										undoStack.push(theme)
										themeDispatch({ type: "update", payload: { newTheme: nextTheme } })
										setColorFormValues(nextTheme)
									}
								}}
								disabled={redoStack.stack.length === 0}
							>
								Redo
							</StyledButton>
						</Container>
					</StyledSection>
				</SettingsContainer>
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
`

const SettingsContainer = styled.div`
	min-width: 390px;
	width: 30%;
	height: 70%;
	padding: 1rem;
	background-color: ${props => props.theme.containersColor};
	border-radius: 10px;
	z-index: 2;
	position: relative;
`
const StyledSection = styled.section`
	margin: 0 0 1em 0;
`

const StyledTitle = styled.h1`
	color: white;
	font-size: 1.3rem;
	font-weight: 600;
	margin-bottom: 0.4em;
`

const StyledH3 = styled.h3`
	color: white;
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 0.2em;
`

const Container = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
	margin: auto;
`
const StyledButton = styled(Button)`
	background-color: ${props => props.theme.primaryColor};
	color: black;
	height: 2rem;
	min-width: 5.5rem;
	border-radius: 10rem;
	font-size: 14px;
	font-weight: 550;
	opacity: ${props => (props.disabled ? 0.2 : 1)};
	pointer-events: ${props => props.disabled && "none"};
`
