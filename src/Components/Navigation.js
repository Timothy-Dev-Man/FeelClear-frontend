import { Pressable, Text, View } from "react-native"
import { navStyles } from "../Styles/components/navigation"
import HomeIcon from "./Icons/HomeIcon"
import PartnerIcon from "./Icons/PartnerIcon"
import SettingsIcon from "./Icons/SettingsIcon"
import { useNavigation } from "@react-navigation/native"
import { useRelationship } from "../Providers/Context/relationshipContext"

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
    <View style={navStyles.container}>
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
    </View>
  )
}

export default Navigation
