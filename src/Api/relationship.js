export async function setRelationshipFetch(userId1, inputCode) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/relationship/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId1: userId1, partnerCode: inputCode }),
      },
    )

    const data = await response.json()

    console.log("setRelationshipFetch: ", data)
    return data
  } catch (err) {
    console.error("setRelationshipFetch error:", err)
    throw err
  }
}
