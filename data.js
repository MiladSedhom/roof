const DATA = {
	count: 5,
	background: "",
	defaultSearchEngine: {
		name: "Google",
		url: "https://www.google.com/search?q=%QUERY",
		shortcut: "g",
	},
	bookmarks: [
		{ id: 0, name: "Bookmarks Bar", type: "folder" },
		{ id: 1, name: "Others", type: "folder" },
		{ id: 2, name: "Github", type: "link", url: "https://github.io", parentId: 0 },
		{ id: 3, name: "Pintrest", type: "link", url: "https://pintrest.com", parentId: 0 },
		{ id: 4, name: "Series", type: "folder", parentId: 0 },
	],
	shortcuts: {
		g: {
			name: "Google",
			url: "https://www.google.com/search?q=%QUERY",
			backgroundColor: "#1aa260 ",
			textColor: "white",
		},
		gm: {
			name: "Google Maps",
			url: "https://www.google.com/maps?q=%QUERY ",
			backgroundColor: "#1aa260",
			textColor: "white",
		},
		yt: {
			name: "Youtube",
			url: "https://www.youtube.com/results?search_query=%QUERY",
			backgroundColor: "#ff0000",
			textColor: "white",
		},
		d: {
			name: "DuckDuckGo",
			url: "https://duckduckgo.com/?q=%QUERY ",
			backgroundColor: "#DE5833",
			textColor: "white",
		},
		qw: {
			name: "Qwant",
			url: "https://www.qwant.com/?q=%QUERY",
			backgroundColor: "#5C97FF",
			textColor: "black",
		},
		you: {
			name: "You.com",
			url: "https://you.com/search?q=%QUERY&fromSearchBar=true",
			backgroundColor: "#6cd16b",
			textColor: "black",
		},
		p: {
			name: "Pintrest",
			url: "https://www.pinterest.com/search/pins/?q=%QUERY",
			backgroundColor: "#E60023",
			textColor: "white",
		},
		s: {
			name: "Spotify",
			url: "https://open.spotify.com/search/%QUERY",
			backgroundColor: "#1DB954",
			textColor: "black",
		},
	},
}

export { DATA }
