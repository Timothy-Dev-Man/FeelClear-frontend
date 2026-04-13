import { Pressable, Text, View } from "react-native"
import { navStyles } from "../Styles/components/navigation"
import HomeIcon from "./Icons/HomeIcon"
import PartnerIcon from "./Icons/PartnerIcon"
import SettingsIcon from "./Icons/SettingsIcon"
import { useNavigation } from "@react-navigation/native"
import { useRelationship } from "../Providers/Context/relationshipContext"
import { LinearGradient } from "expo-linear-gradient"

const Navigation = () => {
  const navigation = useNavigation()

  const { isConnected, setIsConnected, setHasSkipped } = useRelationship()

  function handleViewPartner() {
    if (!isConnected) {
      setHasSkipped(false)
      setIsConnected(false)
      return
    }

    navigation.navigate("ViewPartner")
  }

  return (
    <LinearGradient
      colors={["#E7DFE9", "#d6c9dd", "#c8b8cf"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0.5, y: 0.3 }}
      end={{ x: 0.5, y: 1 }}
      style={navStyles.container}
    >
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={navStyles.item}
      >
        <HomeIcon size={70} />
        <Text style={[navStyles.label, { color: "#5b9ba2" }]}>Home</Text>
      </Pressable>
      <Pressable onPress={() => handleViewPartner()} style={navStyles.item}>
        <PartnerIcon size={70} />
        <Text style={[navStyles.label, { color: "#f16a62" }]}>Partner</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Settings")}
        style={navStyles.item}
      >
        <SettingsIcon size={65} />
        <Text style={[navStyles.label, { color: "#8a86bb" }]}>Settings</Text>
      </Pressable>
    </LinearGradient>
  )
}

export default Navigation
