import { saveAs } from "file-saver"

export const downloadroofData = async (roofData, fileName) => {
	try {
		const roofDataBlob = new Blob([JSON.stringify(roofData)], { type: "application/json" })
		saveAs(roofDataBlob, fileName)
	} catch (err) {
		console.log(err)
	}
}

export const shareroofData = async roofData => {
	if (navigator.share) {
		const roofDataBlob = new Blob([JSON.stringify(roofData)], { type: "application/json" })
		navigator.share({
			title: "roof bookmarks",
			files: [roofDataBlob],
		})
	} else console.log("no share")
}
