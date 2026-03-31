import { createContext, useState } from "react"
import { setRelationshipFetch } from "../Api/relationship"
import { getToken } from "../Storage/auth"

export const relationshipContext = createContext()

export function RelationshipProvider({ children }) {
  const [relationship, setRelationship] = useState(null)
  const [isLoadingRelationship, setIsLoadingRelationship] = useState(false)
  const [isConnected, setIsConnected] = useState(null)
  const [hasSkipped, setHasSkipped] = useState(false)

  async function createRelationship(userId1, inputCode) {
    setIsLoadingRelationship(true)
    try {
      const token = await getToken()
      const newRelationship = await setRelationshipFetch(
        userId1,
        inputCode,
        token,
      )
      setRelationship(newRelationship.relationship)
      if (newRelationship.relationship.connected_at) {
        setIsConnected(true)
      } else {
        throw new Error("Couldn't connect both users")
      }
    } catch (err) {
      throw err
    } finally {
      setIsLoadingRelationship(false)
    }
  }

  return (
    <relationshipContext.Provider
      value={{
        createRelationship,
        relationship,
        isConnected,
        isLoadingRelationship,
        setHasSkipped,
        hasSkipped,
      }}
    >
      {children}
    </relationshipContext.Provider>
  )
}
