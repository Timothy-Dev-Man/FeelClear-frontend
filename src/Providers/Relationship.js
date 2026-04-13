import { createContext, useCallback, useEffect, useState } from "react"
import { setRelationshipFetch } from "../Api/relationship"
import { getToken } from "../Storage/auth"
import { getPartnerFetch } from "../Api/partner"
import { useAuth } from "./Context/authContext"
import { getUserCode, storeUserCode } from "../Storage/user"

export const relationshipContext = createContext()

export function RelationshipProvider({ children }) {
  const [relationship, setRelationship] = useState(null)
  const [relationshipCode, setRelationshipCode] = useState(null)
  const [isLoadingRelationship, setIsLoadingRelationship] = useState(false)

  const [isConnected, setIsConnected] = useState(null)

  const [hasSkipped, setHasSkipped] = useState(false)

  const [partner, setPartner] = useState(null)
  const [isPartnerLoading, setPartnerLoading] = useState(false)

  const { user } = useAuth()

useEffect(() => {
  if (!user) return

  async function initRelationship() {
    setIsLoadingRelationship(true)

    try {
      const code = await getUserCode()

      setIsConnected(user?.is_connected ?? false)
      setRelationshipCode(code ?? null)
    } finally {
      setIsLoadingRelationship(false)
    }
  }

  initRelationship()
}, [user])

  async function createRelationship(userId1, inputCode) {
    setIsLoadingRelationship(true)
    try {
      const token = await getToken()
      setRelationshipCode(inputCode)
      await storeUserCode(inputCode)
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

const getPartner = useCallback(async (inputCode) => {
  setPartnerLoading(true)

  try {
    const token = await getToken()
    const partnerData = await getPartnerFetch(inputCode, token)
    setPartner(partnerData)
  } catch (err) {
    throw err
  } finally {
    setPartnerLoading(false)
  }
}, [])

function resetRelationship() {
  setRelationship(null)
  setRelationshipCode(null)
  setIsConnected(null)
  setHasSkipped(false)
  setPartner(null)
  setPartnerLoading(false)
  setIsLoadingRelationship(false)
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
        isPartnerLoading,
        getPartner,
        resetRelationship,
      }}
    >
      {children}
    </relationshipContext.Provider>
  )
}
