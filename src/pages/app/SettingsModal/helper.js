import { saveAs } from "file-saver"

export const downloadJSON = async (object, fileName) => {
	try {
		const blob = new Blob([JSON.stringify(object)], { type: "application/json" })
		saveAs(blob, fileName)
	} catch (err) {
		console.log(err)
	}
}

export const shareJSON = async (object, title) => {
	if (navigator.share) {
		const blob = new Blob([JSON.stringify(object)], { type: "application/json" })
		navigator.share({
			title: title,
			files: [blob],
		})
	} else console.log("no share")
}
