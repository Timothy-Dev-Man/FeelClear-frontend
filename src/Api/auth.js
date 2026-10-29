import { getApiErrorMessage, readApiResponse } from "./response"

export async function registerFetch(username, profilePicUrl, password) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, profilePicture: profilePicUrl, password }),
    },
  )
  const data = await readApiResponse(response)

  if (data.error || data.errors || data.err) {
    throw new Error(getApiErrorMessage(data))
  }

  return data
}

export async function loginFetch(username, password) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    },
  )
  const data = await readApiResponse(response)

  if (data.error || data.errors || data.err) {
    throw new Error(getApiErrorMessage(data))
  }

  return data
}

export async function IconsFetch() {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/images`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return await readApiResponse(response)
  } catch (err) {
    throw err
  }
}
