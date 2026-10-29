import { Pressable, Text, View } from "react-native"
import { navStyles } from "../Styles/components/navigation"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useRelationship } from "../Providers/Context/relationshipContext"
import { useAuth } from "../Providers/Context/authContext"
import { Heart, Home, Settings } from "lucide-react-native"
import { COLORS } from "../Styles/StyleColors"

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
    <View style={navStyles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: currentRoute === "Home" }}
        onPress={() => HandleOnPress("Home")}
        style={navStyles.item}
      >
        <Home size={26} color={currentRoute === "Home" ? COLORS.forest : COLORS.mutedBlueGray} fill={currentRoute === "Home" ? COLORS.forest : "transparent"} strokeWidth={1.8} />
        <Text style={[navStyles.label, currentRoute === "Home" && navStyles.activeLabel]}>Home</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: currentRoute === "ViewPartner" }}
        onPress={() => handleViewPartner()}
        style={navStyles.item}
      >
        <Heart size={26} color={currentRoute === "ViewPartner" ? COLORS.forest : COLORS.mutedBlueGray} strokeWidth={1.8} />
        <Text style={[navStyles.label, currentRoute === "ViewPartner" && navStyles.activeLabel]}>Together</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: currentRoute === "Settings" }}
        onPress={() => HandleOnPress("Settings")}
        style={navStyles.item}
      >
        <Settings size={26} color={currentRoute === "Settings" ? COLORS.forest : COLORS.mutedBlueGray} strokeWidth={1.8} />
        <Text style={[navStyles.label, currentRoute === "Settings" && navStyles.activeLabel]}>Settings</Text>
      </Pressable>
    </View>
  )
}

export default Navigation
