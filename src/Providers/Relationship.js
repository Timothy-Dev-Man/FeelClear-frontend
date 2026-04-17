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
    if (!user) return

    async function initRelationship() {
       await getRelationship()
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
      await getUser()
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

const getRelationship = useCallback(async () => {
  if (isLoadingRelationship) return

  setIsLoadingRelationship(true)

  try {
    const token = await getToken()
    const rel = await getRelationshipFetch(token)


    if (rel?.error) {
      setRelationship(null)
      return null
    }

    if (rel?.relationship) {
      setRelationship(rel.relationship)
    }

    return rel?.relationship
  } finally {
    setIsLoadingRelationship(false)
  }
}, [relationship, isLoadingRelationship])

  async function deleteRelationship() {
    setIsLoadingRelationship(true)
    try {
      const token = await getToken()
      const del = await deleteRelationshipFetch(token)
      console.log("del: ", del)
      await getUser()
      return
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
