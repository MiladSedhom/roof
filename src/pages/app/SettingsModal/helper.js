import { saveAs } from "file-saver";

export const downloadData = async (data, fileName) => {
	try {
		const dataBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
		saveAs(dataBlob, fileName);
	} catch (err) {
		console.log(err);
	}
};

export const shareData = async (data) => {
	if (navigator.share) {
		const dataBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
		navigator.share({
			title: "roof bookmarks",
			files: [dataBlob],
		});
	} else console.log("no share");
};
