export function getFolders(obj) {
	const folders = obj.filter(element => element.type === "folder")
	return folders
}

export const getBookmarkChildren = (parentId, bookmarks) => {
	return bookmarks.filter(bookmark => bookmark.parentId === parentId)
}
