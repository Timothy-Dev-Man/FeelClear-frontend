import { useContext } from "react"
import { relationshipContext } from "../Relationship"

export function useRelationship() {
    const context = useContext(relationshipContext)
  return context
}
