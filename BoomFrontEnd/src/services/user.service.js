import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const postUserResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/users/`,
    method: "POST",
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
};

export const getUsersResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/users/`,
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

export const getUserResource = async (accessToken, userId) => {
  const config = {
    url: `${apiServerUrl}/api/users/userId`,
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

export const deleteUserResource = async (accessToken, userId) => {
  const config = {
    url: `${apiServerUrl}/api/users/userId`,
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

export const updateUserResource = async (accessToken, formData) => {
  const config = {
    url: `${apiServerUrl}/api/users/userId`,
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