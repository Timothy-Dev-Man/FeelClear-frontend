import { createContext, useEffect, useState } from "react"
import { removeToken, storeToken } from "../Storage/auth"
import { DevSettings } from "react-native"
import { registerFetch } from "../Api/auth"
import { getUser, removeUser, storeUser } from "../Storage/user"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const storedUser = await getUser()
      if (storedUser) {
        setUser(storedUser)
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  async function register(username, profilePicUrl) {
    setIsLoading(true)

    try {
      const newUser = await registerFetch(username, profilePicUrl)

      console.log("New User: ", newUser)

      if (!newUser?.token) {
        throw new Error("No token returned from backend")
      }

      await storeToken(newUser.token)
      await storeUser(newUser.user)
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

  // async function login(username, password) {
  //   const newUser = await registerLogin({ username, password })
  //   console.log("New User: ", newUser)
  //   await storeToken(newUser.token)
  //   setUser(newUser.user)
  // }

  async function logout() {
    setUser(null)
    await removeToken()
    await removeUser()
    DevSettings.reload()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
