import { getApiErrorMessage, readApiResponse } from "./response"

export async function setRelationshipFetch(userId1, inputCode, token) {
  if (!token) throw new Error("You are not signed in.")

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/relationship/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId1, partnerCode: inputCode }),
    },
  )

  const data = await readApiResponse(response)
  if (data.error || data.errors || data.err) {
    throw new Error(getApiErrorMessage(data))
  }
  return data
}

export async function getRelationshipFetch(token) {
  if (!token) throw new Error("You are not signed in.")

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/relationship/`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return await readApiResponse(response)
}

export async function deleteRelationshipFetch(token) {
  if (!token) throw new Error("You are not signed in.")

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/relationship/`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const data = await readApiResponse(response)
  if (data.error || data.errors || data.err) {
    throw new Error(getApiErrorMessage(data))
  }
  return data
}