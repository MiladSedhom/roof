const DATA = {
  background: "",
  searchEngine: "Google",
  bookmarks: {
    bookmarksBar: [
      { name: "Github", url: "https://www.github.com", color: "#171515" },
      { name: "Pintrest", url: "https://pinterest.com", color: "#bd081c" },
      { name: "Imdb", url: "https://www.imdb.com", color: "#d9b226" },
      { name: "Spotify", url: "https://open.spotify.com", color: "#1DB954" },
    ],
    folder1: [{ name: "google drive", url: "http://drive.google.com" }],
    folder2: [{ name: "google drive", url: "http://drive.google.com" }],
  },
};

export { DATA, searchPrefixes };

//todo
// extention t comuincate with the browser :""

const searchPrefixes = {
  g: "https://www.google.com/search?q=%query ",
  y: "https://www.youtube.com/results?search_query=%query",
  gm: "https://www.google.com/maps?q=%query ",
  d: "https://duckduckgo.com/?q=%query ",
  qw: "https://www.qwant.com/?q=%query",
  you: "https://you.com/search?q=%query&fromSearchBar=true",
};
