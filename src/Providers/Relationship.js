import { createContext, useCallback, useEffect, useState } from "react"
import {
  deleteRelationshipFetch,
  getRelationshipFetch,
  setRelationshipFetch,
} from "../Api/relationship"
import { getToken } from "../Storage/auth"
import { getPartnerFetch } from "../Api/partner"
import { useAuth } from "./Context/authContext"

export const relationshipContext = createContext()

export function RelationshipProvider({ children }) {
  const [relationship, setRelationship] = useState(null)
  const [isLoadingRelationship, setIsLoadingRelationship] = useState(false)

  const [hasSkipped, setHasSkipped] = useState(false)

  const [partner, setPartner] = useState(null)
  const [isPartnerLoading, setPartnerLoading] = useState(false)

  const { user, getUser } = useAuth()

  useEffect(() => {
    if (!user) {
      setRelationship(null)
      setPartner(null)
      setHasSkipped(false)
      return
    }

    async function initRelationship() {
      try {
        await getRelationship()
      } catch { }
    }

    initRelationship()
  }, [user?.id])

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
      await getUser()
    } catch (error) {
      if (error.status === 401) {
        try {
          await getUser()
        } catch { }
      }
      throw error
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
    } catch (error) {
      if (error.status === 401) {
        try {
          await getUser()
        } catch { }
      }
      throw error
    } finally {
      setPartnerLoading(false)
    }
  }, [])

  const getRelationship = useCallback(async () => {
    setIsLoadingRelationship(true)
    try {
      const token = await getToken()
      if (!token) {
        setRelationship(null)
        return null
      }

      const result = await getRelationshipFetch(token)
      const currentRelationship = result?.relationship ?? null
      setRelationship(currentRelationship)
      return currentRelationship
    } catch (error) {
      if (error.status === 401) {
        try {
          await getUser()
        } catch { }
      }
      throw error
    } finally {
      setIsLoadingRelationship(false)
    }
  }, [])

  async function deleteRelationship() {
    setIsLoadingRelationship(true)
    try {
      const token = await getToken()
      const del = await deleteRelationshipFetch(token)
      setRelationship(null)
      setPartner(null)
      await getUser()
      return del
    } catch (error) {
      if (error.status === 401) {
        try {
          await getUser()
        } catch { }
      }
      throw error
    } finally {
      setIsLoadingRelationship(false)
    }
  }

  return (
    <relationshipContext.Provider
      value={{
        createRelationship,
        relationship,
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
