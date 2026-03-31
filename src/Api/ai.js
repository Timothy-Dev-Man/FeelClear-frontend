export async function aiFetch(input, token, relationshipId) {
  if (!input) {
    throw new Error("Message must not be blank")
  }
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user/ai`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: input, relId: relationshipId }),
      },
    )

    const data = await response.json()

    console.log("AI fetch response data: ", data.result)
    return data.result
  } catch (err) {
    throw err
  }
}
