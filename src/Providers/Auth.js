import { createContext, useState } from "react"
import { removeToken, storeToken } from "../Storage/auth"
import { DevSettings } from "react-native"
import { registerFetch } from "../Api/auth"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function register(username, profilePicUrl) {
    setIsLoading(true)
    try {
      const newUser = await registerFetch(username, profilePicUrl)
      console.log("New User: ", newUser)
      if (!newUser.token) {
        throw new Error("No token returned from backend")
      }
      await storeToken(newUser.token)
      setUser(newUser.user)
    } catch (err) {
      throw err
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
    DevSettings.reload()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
