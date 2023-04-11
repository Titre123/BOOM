import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/dashboard/songForm.css';

export default function SongForm() {
  const { getAccessTokenSilently } = useAuth0();
  const [songTitle, setSongTitle] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [songThumbnail, setSongThumbnail] = useState(null);
  const [songDescription, setSongDescription] = useState("");
  const [songReleaseDate, setSongReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [songLyrics, setSongLyrics] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [songArtiste, setSongArtiste] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSongTitleChange = (event) => {
    setSongTitle(event.target.value);
  };

  const handleSongFileChange = (event) => {
    setSongFile(event.target.files[0]);
  };

  const handleSongThumbnailChange = (event) => {
    setSongThumbnail(event.target.files[0]);
  };

  const handleSongDescriptionChange = (event) => {
    setSongDescription(event.target.value);
  };

  const handleSongReleaseDateChange = (event) => {
    setSongReleaseDate(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSongLyricsChange = (event) => {
    setSongLyrics(event.target.value);
  };

  const handleSongGenreChange = (event) => {
    setSongGenre(event.target.value);
  };

  const handleSongArtisteChange = (event) => {
    setSongArtiste(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("songTitle", songTitle);
    formData.append("songFile", songFile);
    formData.append("songThumbnail", songThumbnail);
    formData.append("songDescription", songDescription);
    formData.append("songReleaseDate", songReleaseDate);
    formData.append("duration", duration);
    formData.append("songLyrics", songLyrics);
    formData.append("songGenre", songGenre);
    formData.append("songArtiste", songArtiste);

    try {
      const ACCESS_TOKEN = await getAccessTokenSilently();
      const response = await axios.post(
        "http://localhost:6060/api/songs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.error || "An unknown error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="song-form">
      <div className="form-group">
        <label htmlFor="songTitle">Song Title:</label>
        <input
          type="text"
          id="songTitle"
          value={songTitle}
          onChange={handleSongTitleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="songFile">Song File:</label>
        <input
          type="file"
          id="songFile"
          onChange={handleSongFileChange}
          accept="audio/*"
        />
      </div>

      <div className="form-group">
        <label htmlFor="songThumbnail">Song Thumbnail:</label>
        <input
          type="file"
          id="songThumbnail"
          onChange={handleSongThumbnailChange}
          accept="image/*"
        />
      </div>

      <div className="form-group">
        <label htmlFor="songDescription">Song Description:</label>
        <textarea id="songDescription" value={songDescription} onChange={handleSongDescriptionChange}></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="songReleaseDate">Release Date:</label>
        <input type="date" id="songReleaseDate" value={songReleaseDate} onChange={handleSongReleaseDateChange} />
      </div>

      <div className="form-group">
        <label htmlFor="songGenre">Genre:</label>
        <input type="text" id="songGenre" value={songGenre} onChange={handleSongGenreChange} />
      </div>

      <div className="form-group">
        <label htmlFor="songArtiste">Artiste:</label>
        <input type="text" id="songArtiste" value={songArtiste} onChange={handleSongArtisteChange} />
      </div>

      <div className="form-group">
        <label htmlFor="songLyrics">Lyrics:</label>
        <textarea id="songLyrics" value={songLyrics} onChange={handleSongLyricsChange} ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration:</label>
        <input type="text" id="duration" value={duration} onChange={handleDurationChange} />
      </div>
      <div className="form-group">
        <button>Upload</button>
      </div>
    </form>
  )
}
