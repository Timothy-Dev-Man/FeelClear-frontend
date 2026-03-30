import { createContext, useState } from "react"
import { setRelationshipFetch } from "../Api/relationship"

export const relationshipContext = createContext()

export function RelationshipProvider({ children }) {
  const [relationship, setRelationship] = useState(null)
  const [isLoadingRelationship, setIsLoadingRelationship] = useState(false)
  const [isConnected, setIsConnected] = useState(null)

  async function createRelationship(userId1, inputCode) {
    setIsLoadingRelationship(true)
    try {
      const newRelationship = await setRelationshipFetch(userId1, inputCode)
      console.log("New User: ", newRelationship)
      setRelationship(newRelationship)
      if (typeof newRelationship.is_connected === "Boolean") {
        setIsConnected(newRelationship.is_connected)
      } else {
        setIsConnected(false)
        throw new Error("Is Connected is not true or false")
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
      }}
    >
      {children}
    </relationshipContext.Provider>
  )
}
