async function registerFetch({ username, profilePicUrl }) {
  console.log("Register Fetch: ", username, profilePicUrl)
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: { username: username, profilePicture: profilePicUrl },
    })

    const data = await response.json()

    console.log("RegisterFetch: ", data)
    return data
  } catch (err) {
    throw new Error("RegisterFetch: ", err)
  }
}

