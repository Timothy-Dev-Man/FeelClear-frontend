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

    const rawError = data.errors || data.error || data.err || data?.err?.message
    if (rawError) {
      let message = "Unknown error"

      if (Array.isArray(rawError)) {
        message = rawError.map((e) => e.msg).join(", ")
      } else if (typeof rawError === "string") {
        message = rawError
      } else if (rawError?.message) {
        message = rawError.message
      }

      throw new Error(message)
    }
    return data
  } catch (err) {
    console.error("RegisterFetch asdf error:", err)
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
    const rawError = data.errors || data.error || data.err || data?.err?.message
    if (rawError) {
      let message = "Unknown error"

      if (Array.isArray(rawError)) {
        message = rawError.map((e) => e.msg).join(", ")
      } else if (typeof rawError === "string") {
        message = rawError
      } else if (rawError?.message) {
        message = rawError.message
      }

      throw new Error(message)
    }
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
