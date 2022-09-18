import { useState } from "react"
import styled from "styled-components"
import Button from "../../../components/Button/Button"
import Input from "../../../components/Input/Input"
import Select from "../../../components/Select/Select"
import { useContext } from "react"
import { ThemeContext } from "../../../contexts/ThemeContext"
import { useClickOutside } from "../../../hooks/useClickOutside"
import { useRef } from "react"
import { getFolders, isValidURL } from "./helpers"
import { useEffect } from "react"

export default function BookmarkForm(props) {
	const { currentCount, bookmarks, toggleForm, dispatch, dispatchType, bookmarkBeingEdited, parentPosition } = props
	const theme = useContext(ThemeContext)
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

	const [formValues, setFormValues] = useState(defaultFormValues)
	const [formErrors, setFormErrors] = useState({})

	const validate = values => {
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
		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	const onChange = e => {
		setFormValues(formValues => {
			return { ...formValues, [e.target.name]: e.target.value }
		})
	}

	function submitHandler(e) {
		e.preventDefault()
		if (!validate(formValues)) return
		const newBookmark = {
			id: bookmarkBeingEdited ? bookmarkBeingEdited.id : currentCount,
			name: formValues.name,
			type: formValues.type,
			parentId: formValues.targetId - 0,
			childrenIds: formValues.type === "folder" ? [] : undefined,
			url: formValues.type === "link" ? formValues.url : undefined,
		}
		dispatch({ type: dispatchType, payload: { bookmark: newBookmark } })
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
	background-color: wheat;
	color: black;
	font-weight: 600;
	margin: 0.5rem 0 0 0;
`
