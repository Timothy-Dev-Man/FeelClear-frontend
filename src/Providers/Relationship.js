import { createContext, useCallback, useEffect, useState } from "react"
import { deleteRelationshipFetch, getRelationshipFetch, setRelationshipFetch } from "../Api/relationship"
import { getToken } from "../Storage/auth"
import { getPartnerFetch } from "../Api/partner"
import { useAuth } from "./Context/authContext"

export const relationshipContext = createContext()

export function RelationshipProvider({ children }) {
  const [relationship, setRelationship] = useState(null)
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
        setIsConnected(user?.is_connected ?? false)
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

  const getPartner = useCallback(async () => {
    setPartnerLoading(true)

    try {
      const token = await getToken()
      const partnerData = await getPartnerFetch(token)
      setPartner(partnerData)
    } catch (err) {
      throw err
    } finally {
      setPartnerLoading(false)
    }
  }, [])

  async function getRelationship() {
    setIsLoadingRelationship(true)
    try {
      const token = await getToken()
      const rel = await getRelationshipFetch(token)
      console.log("Rel: ", rel)
      if (rel?.relationship) {
        setRelationship(rel.relationship)
        return rel.relationship
      }
    } catch (err) {
      throw err
    } finally {
      setIsLoadingRelationship(false)
    }
  }

    async function deleteRelationship() {
      setIsLoadingRelationship(true)
      try {
        const token = await getToken()
        const del = await deleteRelationshipFetch(token)
        console.log("del: ", del)
        return
      } catch (err) {
        throw err
      } finally {
        setIsLoadingRelationship(false)
      }
    }

  useEffect(() => {
    getRelationship()
  }, [])

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
        partner,
        isPartnerLoading,
        getPartner,
        getRelationship,
        deleteRelationship,
      }}
    >
      {children}
    </relationshipContext.Provider>
  )
}
