export async function getPartnerFetch(token) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/relationship/partner`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const data = await response.json()

    console.log("getPartnerFetch: ", data)
    return data
  } catch (err) {
    console.error("getPartnerFetch error:", err)
    throw err
  }
}
