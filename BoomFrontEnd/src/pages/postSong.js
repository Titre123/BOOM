import React, { useState } from 'react';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react'

function SongForm() {
  const {getAccessTokenSilently} = useAuth0()
  const [songName, setSongName] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [songThumbnail, setSongThumbnail] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSongNameChange = (event) => {
    setSongName(event.target.value);
  };

  const handleSongFileChange = (event) => {
    setSongFile(event.target.files[0]);
  };

  const handleSongThumbnailChange = (event) => {
    setSongThumbnail(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('songName', songName);
    formData.append('songFile', songFile);
    formData.append('songThumbnail', songThumbnail);

    try {
      for (let key of formData) {
        console.log(key[0] + key[1])
      }
      const ACCESS_TOKEN = await getAccessTokenSilently();
      const response = await axios.post('http://localhost:6060/api/songs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${ACCESS_TOKEN}` // replace with your Auth0 access token
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="songName">Song name:</label>
        <input type="text" id="songName" value={songName} onChange={handleSongNameChange} />
      </div>

      <div>
        <label htmlFor="songFile">Song file:</label>
        <input type="file" id="songFile" onChange={handleSongFileChange} accept="audio/*" />
      </div>

      <div>
        <label htmlFor="songThumbnail">Song thumbnail:</label>
        <input type="file" id="songThumbnail" onChange={handleSongThumbnailChange} accept="image/*" />
      </div>

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default SongForm;
