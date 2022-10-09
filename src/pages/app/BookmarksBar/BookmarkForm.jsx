import styled from "styled-components"
import Button from "../../../components/Button/Button"
import Input from "../../../components/Input/Input"
import Select from "../../../components/Select/Select"
import { useClickOutside } from "../../../hooks/useClickOutside"
import { useRef } from "react"
import { getFolders, isValidURL } from "./helpers"
import { useEffect } from "react"
import { useBookmarksDispatch, useBookmarksStore } from "../../../stores/useBookmarksStore"
import { useForm } from "../../../hooks/useForm"
import { useThemeStore } from "../../../stores/useThemeStore"

export default function BookmarkForm({ toggleForm, bookmarkBeingEdited, parentPosition }) {
	const theme = useThemeStore()

	const bookmarks = useBookmarksStore()
	const bookmarksDispatch = useBookmarksDispatch()
	const foldersList = getFolders(bookmarks)

	const formRef = useRef()
	useClickOutside(formRef, toggleForm)

	useEffect(() => {
		async function getClipboardUrl() {
			const clipboardText = await navigator.clipboard.readText()
			if (isValidURL(clipboardText)) {
				setFormValues({ ...formValues, url: clipboardText })
			}
		}

		if (!bookmarkBeingEdited) {
			getClipboardUrl()
		}
	}, [])

	const defaultFormValues = bookmarkBeingEdited
		? {
				name: bookmarkBeingEdited.name,
				url: bookmarkBeingEdited.url,
				type: bookmarkBeingEdited.type,
				targetId: bookmarkBeingEdited.parentId,
		  }
		: { name: "", url: "", type: "link", targetId: 0 }

	const getErrors = values => {
		const errors = {}
		if (!values.name) {
			errors.name = "name is required"
		}
		if (values.type === "link" && !isValidURL(values.url)) {
			errors.url = "this is not a valid url"
		}
		if (values.type === "link" && !values.url) {
			errors.url = "url is required"
		}
		return errors
	}

	const [formValues, setFormValues, onChange, validate, formErrors] = useForm(defaultFormValues, getErrors)

	function submitHandler(e) {
		e.preventDefault()
		if (!validate(formValues)) return
		console.log("afterValidation")
		const newBookmark = {
			id: bookmarkBeingEdited ? bookmarkBeingEdited.id : bookmarks[bookmarks.length - 1].id + 1,
			name: formValues.name,
			type: formValues.type,
			parentId: formValues.targetId - 0,
			childrenIds: formValues.type === "folder" ? [] : undefined,
			url: formValues.type === "link" ? formValues.url : undefined,
		}
		bookmarksDispatch({
			type: bookmarkBeingEdited ? "updateBookmark" : "addBookmark",
			payload: { newBookmark: newBookmark },
		})
		toggleForm()
	}

	return (
		<Wrapper ref={formRef} backgroundColor={theme.containersColor} parentPosition={parentPosition}>
			<Form action="#" id="form" autoComplete="off">
				<Input
					name="name"
					value={formValues.name}
					placeholder="Name"
					onChange={e => {
						onChange(e)
					}}
					errorMessage={formErrors["name"]}
				/>
				<Input
					name="url"
					value={formValues.url}
					placeholder="Url"
					onChange={e => {
						onChange(e)
					}}
					errorMessage={formErrors["url"]}
					disabled={formValues.type === "folder"}
				/>

				<Select
					label="location: "
					value={formValues.targetId}
					onChange={e => {
						setFormValues(prevState => {
							return { ...prevState, targetId: e.target.value }
						})
					}}
				>
					{foldersList.map(element => (
						<option value={element.id} key={element.id}>
							{element.name}
						</option>
					))}
				</Select>

				<Select
					label={"type: "}
					value={formValues.type}
					onChange={e => {
						setFormValues(prevState => {
							return { ...prevState, type: e.target.value }
						})
					}}
					disabled={!!bookmarkBeingEdited}
				>
					<option value="link">Link</option>
					<option value="folder">Folder</option>
				</Select>

				<FormButton
					theme={theme}
					type="submit"
					form="form"
					style={{ outline: "solid 1px black" }}
					onClick={e => {
						submitHandler(e)
					}}
				>
					ADD
				</FormButton>
			</Form>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: fixed;
	left: ${props => {
		const left = props.parentPosition.left + props.parentPosition.width / 2 - 7.5 * 16
		return left < 0 ? 0 : left + "px"
	}};
	top: ${props => props.parentPosition.top + 32 + "px"};
	width: 15rem;
	max-height: 85vh;
	overflow-y: auto;
	padding: 1.5rem 1rem;
	margin: 0.5rem;
	border-radius: 1rem;
	background-color: ${props => props.backgroundColor || "#383535 "};
	color: white;
	outline: 2px solid black;
`

const Form = styled.form`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
`
const FormButton = styled(Button)`
	width: 5rem;
	background-color: ${props => props.theme.primaryColor};
	color: black;
	font-weight: 600;
	margin: 0.5rem 0 0 0;
`
