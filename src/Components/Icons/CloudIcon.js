import { View } from "react-native"
import { HeartCrack, HeartHandshake } from "lucide-react-native"
import { COLORS } from "../../Styles/StyleColors"

export const CloudIcon = () => {
  return (
    <View
      style={{
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#E7ECE4",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeartHandshake size={26} color={COLORS.forest} strokeWidth={1.8} />
    </View>
  )
}

export const SadCloudIcon = () => {
  return (
    <View
      style={{
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#F0E9EB",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeartCrack size={25} color={COLORS.berry} strokeWidth={1.8} />
    </View>
  )
}
