import makeStore from "../hooks/makeStore"
import { DATA } from "../../data"

const reducer = (state, action) => {
	switch (action.type) {
		default:
			return state
	}
}

const initialState = { shortcuts: DATA.shortcuts, defaultSearchEngine: DATA.defaultSearchEngine }

const [ShortcutsProvider, useShortcutsStore, useShortcutsDispatch] = makeStore(reducer, initialState, "roofShortcuts")

export { ShortcutsProvider, useShortcutsStore, useShortcutsDispatch }
