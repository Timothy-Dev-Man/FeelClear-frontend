import { getApiErrorMessage, readApiResponse } from "./response"

export async function getPartnerFetch(token) {
  if (!token) throw new Error("You are not signed in.")

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/relationship/partner`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const data = await readApiResponse(response)
  if (data.error || data.errors || data.err) {
    throw new Error(getApiErrorMessage(data))
  }
  return data
}
