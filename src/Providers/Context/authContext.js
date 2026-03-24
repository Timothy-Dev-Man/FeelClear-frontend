import { useContext } from "react"
import { AuthContext } from "../Auth"
import { getToken } from "../../Storage/auth"

export async function useAuth() {
    const token = await getToken()
    if (!token) {
        throw new Error("Session timed out or invalid token.");
    }
    const context = useContext(AuthContext)
  return context
}
