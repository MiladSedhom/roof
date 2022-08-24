import styled from "styled-components";
import { useToggle } from "../../hooks/useToggle";
import AddBookmarkForm from "../../pages/app/BookmarksBar/AddBookmarkForm";

export default function LinkContextMenu(props) {
	const deleteBookmark = () => {
		setData(prevState => {
			delete prevState.nnnnn;
			const newState = prevState;
		});
	};

	return (
		<Div {...props}>
			<ContextMenuButton> open url </ContextMenuButton>
			<ContextMenuButton> open url in a new tab </ContextMenuButton>
			<ContextMenuButton> edit link </ContextMenuButton>
			<ContextMenuButton> delete link </ContextMenuButton>
			<ContextMenuButton> about </ContextMenuButton>
		</Div>
	);
}

const Div = styled.div`
	width: 10rem;
	padding: 5px;
	display: flex;
	flex-direction: column;
	background-color: #514f4d;
	border-radius: 10px;
`;

const ContextMenuButton = styled.button`
	background-color: #514f4d;
	border: none;
	padding: 0.25rem;
	color: white;
	&:hover {
		background-color: #747474;
	}
`;
