const DATA = {
  background: "",

  defaultSearchEngine: {
    name: "Google",
    url: "https://www.google.com/search?q=%QUERY",
    shortcut: "g",
  },

  bookmarks: [
    {
      name: "bookmarksBar",
      type: "folder",
      children: [
        {
          name: "Github",
          type: "link",
          url: "https://www.github.com",
          backgroundColor: "#171515",
          textColor: "white",
        },
        {
          name: "Pintrest",
          type: "link",
          url: "https://pinterest.com",
          backgroundColor: "#bd081c",
          textColor: "white",
        },
        {
          name: "Imdb",
          type: "link",
          url: "https://www.imdb.com",
          backgroundColor: "#d9b226",
          textColor: "black",
        },
        {
          name: "Spotify",
          type: "link",
          url: "https://open.spotify.com",
          backgroundColor: "#1DB954",
          textColor: "black",
        },
        {
          name: "Spoti",
          type: "link",
          url: "https://open.spotify.com",
          backgroundColor: "#1DB954",
          textColor: "black",
        },
      ],
    },

    {
      name: "others",
      type: "folder",
      children: [
        {
          name: "University Stuff",
          type: "folder",
          children: [
            {
              name: "Google Drive",
              type: "link",
              url: "https://drive.google.com",
            },
            {
              name: "physics",
              type: "folder",
              children: [
                {
                  name: "Google Drive",
                  type: "link",
                  url: "https://drive.google.com",
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  shortcuts: {
    g: {
      name: "Google",
      url: "https://www.google.com/search?q=%QUERY",
      backgroundColor: "#1aa260 ",
      textColor: "white",
    },
    yt: {
      name: "Youtube",
      url: "https://www.youtube.com/results?search_query=%QUERY",
      backgroundColor: "#ff0000",
      textColor: "white",
    },
    gm: {
      name: "Google Maps",
      url: "https://www.google.com/maps?q=%QUERY ",
      backgroundColor: "#1aa260",
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
};

export { DATA };
