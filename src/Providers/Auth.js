import { createContext, useEffect, useState } from "react"
import { getToken, removeToken, storeToken } from "../Storage/auth"
import { loginFetch, registerFetch } from "../Api/auth"
import { getMeFetch, updateProfileFetch } from "../Api/user"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [selectedPic, setSelectedPic] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadUser() {
      try {
        const token = await getToken()
        if (!token) return

        const result = await getMeFetch(token)
        if (active && result?.user) setUser(result.user)
      } catch (error) {
        if (error.status === 401) {
          try {
            await removeToken()
          } catch { }
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadUser()

    return () => {
      active = false
    }
  }, [])

  async function register(username, profilePicUrl, password) {
    setIsLoading(true)

    try {
      const newUser = await registerFetch(username, profilePicUrl, password)

      if (!newUser?.token || !newUser?.user) {
        throw new Error("Registration response was incomplete. Please try again.")
      }

      await storeToken(newUser.token)
      setUser(newUser.user)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(username, password) {
    setIsLoading(true)
    try {
      const result = await loginFetch(username, password)

      if (typeof result?.token !== "string" || !result?.user) {
        throw new Error("Login response was incomplete. Please try again.")
      }

      await storeToken(result.token)
      setUser(result.user)
    } finally {
      setIsLoading(false)
    }
  }

  async function updateUser(newUsername, newUrl) {
    setIsLoading(true)
    try {
      const token = await getToken()
      await updateProfileFetch(token, newUsername, newUrl)
      await getUser()
    } finally {
      setIsLoading(false)
    }
  }

  async function getUser() {
    const token = await getToken()
    if (!token) {
      setUser(null)
      return null
    }

    try {
      const me = await getMeFetch(token)
      if (me?.user) setUser(me.user)
      return me?.user ?? null
    } catch (error) {
      if (error.status === 401) {
        await removeToken()
        setUser(null)
      }
      throw error
    }
  }

  async function logout() {
    try {
      await removeToken()
    } finally {
      setUser(null)
      setSelectedPic(null)
    }
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
