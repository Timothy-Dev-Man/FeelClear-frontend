import { Pressable, Text, View } from "react-native"
import { navStyles } from "../Styles/components/navigation"
import HomeIcon from "./Icons/HomeIcon"
import PartnerIcon from "./Icons/PartnerIcon"
import SettingsIcon from "./Icons/SettingsIcon"

const Navigation = () => {
  return (
    <View style={navStyles.container}>
      <Pressable style={navStyles.item}>
        <HomeIcon size={70} />
        <Text style={[navStyles.label, { color: "#5b9ba2" }]}>Home</Text>
      </Pressable>
      <Pressable style={navStyles.item}>
        <PartnerIcon size={70} />
        <Text style={[navStyles.label, { color: "#f16a62" }]}>Partner</Text>
      </Pressable>
      <Pressable style={navStyles.item}>
        <SettingsIcon size={65} />
        <Text style={[navStyles.label, { color: "#8a86bb" }]}>Settings</Text>
      </Pressable>
    </View>
  )
}

export default Navigation
