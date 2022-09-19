export function getFolders(obj) {
	const folders = obj.filter(element => element.type === "folder")
	return folders
}

export function getBookmarkChildren(parentId, bookmarks) {
	return bookmarks.filter(bookmark => bookmark.parentId === parentId)
}

export function getListPosition(buttonPosition, isNested, listWidth) {
	const windowWidth = window.innerWidth
	const spaceBetweenLists = 8
	const horizentalSpacefromTheButton = 16

	let left
	if (!isNested) left = buttonPosition.left + buttonPosition.width / 2 - listWidth
	else if (buttonPosition.left < windowWidth / 2) left = buttonPosition.left + buttonPosition.width + spaceBetweenLists
	else left = buttonPosition.left - buttonPosition.width - spaceBetweenLists

	let top
	if (!isNested) top = buttonPosition.top + buttonPosition.height + horizentalSpacefromTheButton
	else top = buttonPosition.top + buttonPosition.height

	return { left, top }
}

export function isValidURL(string) {
	let url

	try {
		url = new URL(string)
	} catch (_) {
		return false
	}

	return true
}
