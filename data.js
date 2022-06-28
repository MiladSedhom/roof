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

  prefixes : {
    g: { url: "https://www.google.com/search?q=%query ", backgroundColor: "#6cd16b", textColor:"black" },
    yt: { url: "https://www.youtube.com/results?search_query=%query", backgroundColor: "#ea8383",textColor: "black" },
    gm: { url: "https://www.google.com/maps?q=%query ", backgroundColor: "#6cd16b", textColor:"black"  },
    d: { url: "https://duckduckgo.com/?q=%query ", backgroundColor: "#e08b55", textColor:"black"  },
    qw: { url: "https://www.qwant.com/?q=%query", backgroundColor: "#5C97FF", textColor:"black"  },
    you: { url: "https://you.com/search?q=%query&fromSearchBar=true", color: "#6cd16b", textColor:"black" },
    p : {url:"https://www.pinterest.com/search/pins/?q=%query", backgroundColor:"#E60023", textColor:"white" },
    s : {url:"https://open.spotify.com/search/%query", backgroundColor:"#1DB954", textColor:"black"}
  }
};

export { DATA };
