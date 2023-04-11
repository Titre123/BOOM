import { callExternalApi } from "./external-api.service";

export const getProfileResource = async (accessToken, songId) => {
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

