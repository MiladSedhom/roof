import makeStore from "../hooks/makeStore"
import { DATA } from "../../data"

const reducer = (state, action) => {
	switch (action.type) {
		case "addBookmark": {
			return [...state, action.payload.newBookmark]
		}
		case "deleteBookmark": {
			let id = action.payload.id
			let newBookmarks = state.filter(element => element.id !== id && element.parentId !== id)
			return [...newBookmarks]
		}
		case "updateBookmark": {
			let newBookmark = action.payload.bookmark
			let updatedBookmarks = state.map(bookmark => {
				if (bookmark.id === newBookmark.id) return newBookmark
				return bookmark
			})
			return [...updatedBookmarks]
		}
		case "upload": {
			return action.payload.uploadedBookmarks
		}
		default:
			return state
	}
}

const [BookmarksProvider, useBookmarksStore, useBookmarksDispatch] = makeStore(reducer, DATA.bookmarks, "roofBookmarks")

export { BookmarksProvider, useBookmarksStore, useBookmarksDispatch }
