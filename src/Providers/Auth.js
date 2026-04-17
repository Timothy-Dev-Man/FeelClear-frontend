import { createContext, useEffect, useState } from "react"
import { getToken, removeToken, storeToken } from "../Storage/auth"
import { DevSettings } from "react-native"
import { loginFetch, registerFetch } from "../Api/auth"
import { getMeFetch, updateProfileFetch } from "../Api/user"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [selectedPic, setSelectedPic] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const user = await getUser()
      if (user) {
        setUser(user)
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  async function register(username, profilePicUrl, password) {
    setIsLoading(true)

    try {
      const newUser = await registerFetch(username, profilePicUrl, password)

      if (!newUser?.token) {
        throw new Error("No token returned from backend")
      }

      await storeToken(newUser.token)
      setUser(newUser.user)
    } catch (err) {
      const errorMessage =
        err?.message || err?.response?.data?.error || JSON.stringify(err)

      if (errorMessage.includes("users_username_key")) {
        alert("Username already taken")
        return
      }

      console.error("Register error:", err)
      alert(`${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(username, password) {
    const user = await loginFetch(username, password)

    if (!user?.token) {
      throw new Error("No token returned from backend")
    }

    await storeToken(user?.token)
    setUser(user.user)
  }

  async function updateUser(newUsername, newUrl) {
    setIsLoading(true)
    try {
      const token = await getToken()
      await updateProfileFetch(token, newUsername, newUrl)
      /* Now get the user after you updated them */
      await getUser()
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  async function getUser() {
    try {
      const token = await getToken()
      const me = await getMeFetch(token)
      console.log("Auth ME: ", me)
      if (me && me.user) {
        setUser(me.user)
        return me.user
      }
    } catch (err) {
      throw err
    }
  }

  async function logout() {
    setUser(null)
    await removeToken()
    DevSettings.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        register,
        logout,
        selectedPic,
        setSelectedPic,
        updateUser,
        login,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
