import { Text, View } from "react-native"
import Navigation from "../../Components/Navigation"
import { partnerStyles } from "../../Styles/screens/Partner/partnerCode"
import { useEffect } from "react"
import { useRelationship } from "../../Providers/Context/relationshipContext"
import ProfileIcon from "../../Components/Icons/ProfileIcon"
import InfoCard from "../../Components/InfoCard"
import { useNavigation } from "@react-navigation/native"

const ViewPartner = () => {
  const { getPartner, partner, isPartnerLoading } = useRelationship()

  console.log("partner: ", partner)

  useEffect(() => {
    if (partner || isPartnerLoading) return

    getPartner()
  }, [partner, isPartnerLoading, getPartner])

  if (!partner) {
    return (
      <View style={partnerStyles.container}>
        <Text>Loading...</Text>
        <Navigation />
      </View>
    )
  }

  return (
    <View style={partnerStyles.container}>
      <ProfileIcon
        userProfileUri={partner.partner.profile_pic}
        title={"You and " + partner.partner.username + " are connected"}
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

      <Navigation />
    </View>
  )
}

export default ViewPartner
