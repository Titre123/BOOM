import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const postSongResource = async (accessToken, formData) => {
  const config = {
    url: `${apiServerUrl}/api/songs/`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      "data": formData,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getSongsResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/songs/`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const getSongResource = async (accessToken, songId) => {
  const config = {
    url: `${apiServerUrl}/api/songs/songId`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const deleteSongResource = async (accessToken, songId) => {
  const config = {
    url: `${apiServerUrl}/api/songs/songId`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const updateSongResource = async (accessToken, formData) => {
  const config = {
    url: `${apiServerUrl}/api/songs/songId`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "data": formData,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}