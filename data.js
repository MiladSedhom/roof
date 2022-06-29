const DATA = {
  background: "",
  defaultSearchEngine: {name:"Google", url: "https://www.google.com/search?q=%query" , prefix:"g"},
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

  shortcuts : {
    g: {name:"Google", url: "https://www.google.com/search?q=%query", backgroundColor: "#1aa260 ", textColor:"white", },
    yt: {name:"Youtube",url: "https://www.youtube.com/results?search_query=%query", backgroundColor: "#ff0000",textColor: "white" },
    gm: {name:"Google Maps",url: "https://www.google.com/maps?q=%query ", backgroundColor: "#6cd16b", textColor:"black"  },
    d: {name:"DuckDuckGo",url: "https://duckduckgo.com/?q=%query ", backgroundColor: "#DE5833", textColor:"white"  },
    qw: {name:"Qwant",url: "https://www.qwant.com/?q=%query", backgroundColor: "#5C97FF", textColor:"black"  },
    you: {name:"You.com",url: "https://you.com/search?q=%query&fromSearchBar=true", color: "#6cd16b", textColor:"black" },
    p : {name:"Pintrest",url:"https://www.pinterest.com/search/pins/?q=%query", backgroundColor:"#E60023", textColor:"white" },
    s : {name:"Spotify",url:"https://open.spotify.com/search/%query", backgroundColor:"#1DB954", textColor:"black"}
  }
};

export { DATA };
