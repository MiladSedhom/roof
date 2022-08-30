import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRef } from "react";
import { getFolders } from "./helpers";

export default function BookmarkForm(props) {
	const { currentCount, bookmarks, toggleForm, dispatch, dispatchType, defaultBookmark } = props;
	const foldersList = getFolders(bookmarks);

	const [url, setUrl] = useState(defaultBookmark && defaultBookmark.url ? defaultBookmark.url : "");
	const [name, setName] = useState(defaultBookmark ? defaultBookmark.name : "");
	const [type, setType] = useState(defaultBookmark ? defaultBookmark.type : "link");
	const [targetId, setTargetId] = useState(0);
	const theme = useContext(ThemeContext);

	const formRef = useRef();
	useClickOutside(formRef, toggleForm);

	function submitHandler(e) {
		e.preventDefault();
		const newBookmark =
			type === "folder"
				? {
						id: defaultBookmark ? defaultBookmark.id : currentCount,
						type,
						name,
						childrenIds: [],
						parentId: targetId - 0,
				  }
				: {
						id: defaultBookmark ? defaultBookmark.id : currentCount,
						type,
						url,
						name,
						parentId: targetId - 0,
				  };

		dispatch({ type: dispatchType, payload: { bookmark: newBookmark } });
		toggleForm();
	}

	return (
		<StyledDiv ref={formRef} backgroundColor={theme.containersColor}>
			<Form action="none">
				<Input
					value={name}
					onInput={e => {
						setName(e.target.value);
					}}
					type="text"
					placeholder="Name"
				/>
				{type === "link" ? (
					<Input
						value={url}
						onInput={e => {
							setUrl(e.target.value);
						}}
						type="text"
						placeholder="url"
					/>
				) : null}

				<div>
					<Select
						label={"location: "}
						value={targetId}
						onChange={e => {
							setTargetId(e.target.value);
						}}
					>
						{foldersList.map(element => (
							<option value={element.id} key={element.id}>
								{element.name}
							</option>
						))}
					</Select>
				</div>

				<div>
					<Select
						label={"type: "}
						value={type}
						onChange={e => {
							setType(e.target.value);
						}}
					>
						<option value="link">Link</option>
						<option value="folder">Folder</option>
					</Select>
				</div>
				<Button
					style={{ outline: "solid 1px black" }}
					onClick={e => {
						submitHandler(e);
					}}
				>
					Add
				</Button>
			</Form>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	position: fixed;
	right: 5rem;
	top: 10rem;
	width: 15rem;
	max-height: 85vh;
	overflow-y: auto;
	margin: 0.5rem;
	padding: 1rem;
	border-radius: 1rem;
	background-color: ${props => props.backgroundColor || "#383535 "};
	color: white;
`;

const Form = styled.form`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	height: 100%;
`;
