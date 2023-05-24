document.addEventListener("DOMContentLoaded", function() {
    var songList = document.getElementById("song-list");
    var songTitle = document.getElementById("song-title");
    var songLyrics = document.getElementById("song-lyrics");
  
    songList.addEventListener("click", function(event) {
      if (event.target.tagName === "A") {
        event.preventDefault();
        var selectedSong = event.target.innerText;
        var lyrics = getLyrics(selectedSong); // You'll need to define this function
        songTitle.innerText = selectedSong;
        songLyrics.innerText = lyrics;
      }
    });
  
    // Function to retrieve lyrics based on the selected song
    function getLyrics(song) {
      // You can implement your logic here or use an API to fetch the lyrics
      // For simplicity, let's assume you have an object with song lyrics
      var songLyrics = {
        "Song 1": "Lyrics for Song 1",
        "Song 2": "Lyrics for Song 2"
      };
      return songLyrics[song] || "Lyrics not found.";
    }
  });
  