export function getFolders(obj) {
	const folders = obj.filter(element => element.type === "folder");
	return folders;
}

export const getBookmarkChildren = (bookmark, bookmarks) => {
	const bookmarkChildren = bookmark.childrenIds.map(childId => {
		return bookmarks.find(element => element.id === childId);
	});
	return bookmarkChildren;
};
