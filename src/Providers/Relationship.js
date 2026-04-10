import { createContext, useState } from "react"
import { setRelationshipFetch } from "../Api/relationship"
import { getToken } from "../Storage/auth"
import { getPartnerFetch } from "../Api/partner"

export const relationshipContext = createContext()

export function RelationshipProvider({ children }) {
  const [relationship, setRelationship] = useState(null)
  const [relationshipCode, setRelationshipCode] = useState(null)
  const [isLoadingRelationship, setIsLoadingRelationship] = useState(false)
  const [isConnected, setIsConnected] = useState(null)
  const [hasSkipped, setHasSkipped] = useState(false)
  const [partner, setPartner] = useState(null)
  const [partnerLoading, setPartnerLoading] = useState(false)

  async function createRelationship(userId1, inputCode) {
    setIsLoadingRelationship(true)
    try {
      const token = await getToken()
      setRelationshipCode(inputCode)
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

    async function getPartner(inputCode) {
      setPartnerLoading(true)
      try {
        const token = await getToken()
        const partner = await getPartnerFetch(inputCode, token)
        setPartner(partner)
      } catch (err) {
        throw err
    } finally {
      setPartnerLoading(false)
    }
  }
  return (
    <relationshipContext.Provider
      value={{
        createRelationship,
        relationship,
        isConnected,
        setIsConnected,
        isLoadingRelationship,
        setHasSkipped,
        hasSkipped,
        relationshipCode,
        setRelationshipCode,
        partner,
        partnerLoading,
        getPartner,
      }}
    >
      {children}
    </relationshipContext.Provider>
  )
}
