import { Text, View } from "react-native"
import { InfoCardStyles } from "../Styles/screens/Home/infoCard"

const InfoCard = ({ text }) => {
  return (
    <View style={InfoCardStyles.rowCard}>
      <Text style={InfoCardStyles.text}>{text}</Text>
    </View>
  )
}

export default InfoCard
