import { createContext } from "react"
import { removeToken, storeToken } from "../Storage/auth"
import { DevSettings } from "react-native"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function register(username, profilePicUrl) {
    const newUser = await registerFetch({ username, profilePicUrl })
    console.log("New User: ", newUser)
    await storeToken(newUser.token)
    setUser(newUser.user)
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
    <AuthContext.Provider value={{ user, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
