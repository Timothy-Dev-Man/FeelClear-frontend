import { Pressable, Text, View } from "react-native"
import Navigation from "../../Components/Navigation"
import { partnerStyles } from "../../Styles/screens/Partner/partnerCode"
import { useEffect, useState } from "react"
import { useRelationship } from "../../Providers/Context/relationshipContext"
import ProfileIcon from "../../Components/Icons/ProfileIcon"
import InfoCard from "../../Components/InfoCard"

const ViewPartner = () => {
  const { getPartner, partner, isPartnerLoading } = useRelationship()
  const [error, setError] = useState("")

  useEffect(() => {
    if (partner || isPartnerLoading || error) return

    let active = true
    getPartner().catch((loadError) => {
      if (active) {
        setError(loadError.message || "Unable to load your partner right now.")
      }
    })

    return () => {
      active = false
    }
  }, [partner, isPartnerLoading, getPartner, error])

  const partnerUser = partner?.partner

  if (!partnerUser) {
    return (
      <View style={partnerStyles.container}>
        <Text style={partnerStyles.status}>
          {error || (isPartnerLoading ? "Loading..." : "Partner profile unavailable.")}
        </Text>
        {error ? (
          <Pressable
            style={partnerStyles.retry}
            onPress={() => {
              setError("")
              getPartner().catch((loadError) => {
                setError(loadError.message || "Unable to load your partner right now.")
              })
            }}
          >
            <Text style={partnerStyles.retryText}>Try again</Text>
          </Pressable>
        ) : null}
        <Navigation />
      </View>
    )
  }

  return (
    <>
      <View style={partnerStyles.container}>
        <ProfileIcon
          userProfileUri={partnerUser.profile_pic}
          title={"You and " + partnerUser.username + " are connected"}
          size={20}
          extraContent={[
            <InfoCard text="We'll help you find the right words to communicate better." />,
            <InfoCard text="Translate emotion into clarity." />,
            <InfoCard text="Understand what you’re feeling—and why" />,
          ]}
          wrapperStyles={{
            wrapper: {
              position: "absolute",
              top: -50,
              alignSelf: "center",
              zIndex: 10,
            },
            padding: 20,
            paddingTop: 80,
          }}
        />

      </View>
      <Navigation />
    </>
  )
}

export default ViewPartner
