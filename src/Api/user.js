export async function getMeFetch(token) {
    if (!token) {
      console.log("No token available")
      return null
    }
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      const text = await response.text()
      console.error("Server error:", text)
      return null
    }

    const data = await response.json()

    console.log("getMeFetch: ", data)
    return data
  } catch (err) {
    console.error("getMeFetch error:", err)
    throw err
  }
}
