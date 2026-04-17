import { Pressable, Text, View } from "react-native"
import { navStyles } from "../Styles/components/navigation"
import HomeIcon from "./Icons/HomeIcon"
import PartnerIcon from "./Icons/PartnerIcon"
import SettingsIcon from "./Icons/SettingsIcon"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useRelationship } from "../Providers/Context/relationshipContext"
import { LinearGradient } from "expo-linear-gradient"
import { useAuth } from "../Providers/Context/authContext"

const Navigation = () => {
  const navigation = useNavigation()

  const route = useRoute()
  const currentRoute = route.name

  const { user } = useAuth()
  const { setHasSkipped } = useRelationship()

  function handleViewPartner() {
    if (!user.is_connected) {
      setHasSkipped(false)
      return
    }

    navigation.navigate("ViewPartner")
  }

  function HandleOnPress(route) {
    navigation.navigate(route)
  }

  return (
    <LinearGradient
      colors={["#E7DFE9", "#d6c9dd", "#c8b8cf"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0.5, y: 0.3 }}
      end={{ x: 0.5, y: 1 }}
      style={navStyles.container}
    >
      <Pressable onPress={() => HandleOnPress("Home")} style={navStyles.item}>
        <HomeIcon currentRoute={currentRoute} size={70} />
        <Text style={[navStyles.label, { color: "#00b5b5" }]}>Home</Text>
      </Pressable>
      <Pressable onPress={() => handleViewPartner()} style={[navStyles.item]}>
        <PartnerIcon currentRoute={currentRoute} size={70} />
        <Text style={[navStyles.label, { color: "#f16a62" }]}>Partner</Text>
      </Pressable>
      <Pressable
        onPress={() => HandleOnPress("Settings")}
        style={[navStyles.item]}
      >
        <SettingsIcon currentRoute={currentRoute} size={65} />
        <Text style={[navStyles.label, { color: "#8a86bb" }]}>Settings</Text>
      </Pressable>
    </LinearGradient>
  )
}

export default Navigation
