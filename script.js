document.addEventListener("DOMContentLoaded", function() {
  var songList = document.getElementById("song-list");
  var songTitle = document.getElementById("song-title");
  var songLyrics = document.getElementById("song-lyrics");

  // Load the song data from the CSV file
  fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS6XIszHy_xuq1BI7LnMm2HKlOSJ6L_FfJUKqvXJO5PTZoMl4ztlcnMatg3SFkVdJraDUyouGsAv_hj/pub?output=csv")
    .then(response => response.text())
    .then(data => {
      // Split the CSV data into an array of rows
      var rows = data.split("\n");

      // Remove the header row if it exists
      var header = rows[0].split(",");
      if (header.length > 1) {
        rows.shift();
      }

      // Clear the existing song list
      songList.innerHTML = "";

      // Populate the song list
      rows.forEach(row => {
        // Split the row into an array of values
        var values = row.split(",");

        // Extract the song data from the values array
        var title = values[0];
        var artist = values[1];
        var lyrics = values[2];

        // Create a new list item element
        var listItem = document.createElement("li");
        // Create a new anchor element for the song title
        var link = document.createElement("a");
        // Set the anchor element's href attribute
        link.href = "#";
        // Set the anchor element's text content to the song title
        link.innerText = title;
        // Append the anchor element to the list item element
        listItem.appendChild(link);
        // Append the list item element to the song list
        songList.appendChild(listItem);
      });

      // Handle click events on song titles
      songList.addEventListener("click", function(event) {
        // Check if the clicked element is an anchor element
        if (event.target.tagName === "A") {
          // Prevent the default link behavior
          event.preventDefault();
          // Get the selected song title
          var selectedSong = event.target.innerText;
          // Find the corresponding song data from the CSV
          var selectedSongData = rows.find(row => row.split(",")[0] === selectedSong);
          // Check if the song data is found
          if (selectedSongData) {
            // Split the selected song data into an array of values
            var selectedSongValues = selectedSongData.split(",");
            // Extract the song information from the values array
            var selectedSongTitle = selectedSongValues[0];
            var selectedSongArtist = selectedSongValues[1];
            var selectedSongLyrics = selectedSongValues[2];

            // Update the song title and lyrics with the selected song's data
            songTitle.innerText = selectedSongTitle;
            songLyrics.innerText = selectedSongLyrics;
          } else {
            // If the song data is not found, display a message
            songTitle.innerText = "Title not found";
            songLyrics.innerText = "";
          }
        }
      });
    })
    .catch(error => console.error("Error loading song data:", error));
});
