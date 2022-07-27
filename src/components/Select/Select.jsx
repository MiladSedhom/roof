import { useId } from "react";
import styled from "styled-components";

export default function Select({ label, children, onChange, restOfProps }) {
	const id = useId();
	return (
		<StyledDiv>
			<label htmlFor={id}> {label} </label>
			<StyledSelect id={id} onChange={onChange} {...restOfProps}>
				{children}
			</StyledSelect>
		</StyledDiv>
	);
}
const StyledDiv = styled.div`
	font-size: 14px;
`;
const StyledSelect = styled.select`
	max-width: 12.5rem;
	height: 1.5rem;
	padding: 0 1rem;
	margin: 0.5rem 0 0 0;
	border: none;
	border-radius: 10px;
	background-color: ${(props) => props.backgroundColor || "#514F4D"};
	color: white;
	&:focus {
		outline: 1px #d2d2d2 solid;
	}
	&::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #878787;
		opacity: 1; /* Firefox */
	}
`;
