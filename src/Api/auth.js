export async function registerFetch(username, profilePicUrl, password) {
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
          password: password,
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

export async function loginFetch(username, password) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      },
    )

    const data = await response.json()

    console.log("loginFetch: ", data)
    return data
  } catch (err) {
    console.error("loginFetch error:", err)
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
