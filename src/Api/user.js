import { readApiResponse } from "./response"

export async function getMeFetch(token) {
  if (!token) {
    throw new Error("You are not signed in.")
  }
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user/me`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return await readApiResponse(response)
}

export async function updateProfileFetch(token, newUsername, newUrl) {
  if (!token) {
    throw new Error("You are not signed in.")
  }
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user/profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newUsername, newUrl }),
    },
  )
  return await readApiResponse(response)
}
