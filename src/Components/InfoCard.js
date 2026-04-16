import { Text } from "react-native"
import { InfoCardStyles } from "../Styles/screens/Home/infoCard"
import { LinearGradient } from "expo-linear-gradient"

const InfoCard = ({ text }) => {
  return (
    <LinearGradient
      colors={["#F5F7FF", "#EEEAFB", "#E7E0FA"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0.2, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={InfoCardStyles.rowCard}
    >
      <Text style={InfoCardStyles.text}>{text}</Text>
    </LinearGradient>
  )
}

export default InfoCard
