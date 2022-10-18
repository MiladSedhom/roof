import makeStore from "../hooks/makeStore"
import { DATA } from "../../data"

const reducer = (state, action) => {
	switch (action.type) {
		case "upload": {
			return action.payload.uploadedShortcuts
		}
		default:
			return state
	}
}

const initialState = { shortcuts: DATA.shortcuts, defaultSearchEngine: DATA.defaultSearchEngine }

const [ShortcutsProvider, useShortcutsStore, useShortcutsDispatch] = makeStore(reducer, initialState, "roofShortcuts")

export { ShortcutsProvider, useShortcutsStore, useShortcutsDispatch }
