export default function FileUpload({ dispatch }) {
	const onInputHandler = async e => {
		const reader = new FileReader()
		reader.readAsText(e.target.files[0])
		reader.onload = () => {
			let parsedJSON = JSON.parse(reader.result)
			dispatch({ type: "uploadJSON", payload: { uploadedJSON: parsedJSON } })
		}
	}

	return (
		<input
			type="file"
			accept=".json"
			onInput={e => {
				onInputHandler(e)
			}}
		/>
	)
}
