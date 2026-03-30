export async function registerFetch(username, profilePicUrl) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          profilePicture: profilePicUrl,
        }),
      },
    )

    const data = await response.json()

    console.log("RegisterFetch: ", data)
    return data
  } catch (err) {
    console.error("RegisterFetch error:", err)
    throw err
  }
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

    const data = await response.json()
    console.log("IconsFetch: ", data)
    return data
  } catch (err) {
    throw err
  }
}
