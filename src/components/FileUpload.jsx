export default function FileUpload({ callback }) {
	const onInputHandler = async e => {
		const reader = new FileReader()
		reader.readAsText(e.target.files[0])
		reader.onload = () => {
			let parsedJSON = JSON.parse(reader.result)
			callback(parsedJSON)
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
