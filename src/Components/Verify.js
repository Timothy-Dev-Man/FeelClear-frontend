import { Pressable, Text, View } from "react-native"
import { settingsStyles } from "../Styles/components/settingsStyles"

const Verify = ({ cancel, functionPassed, color, text, component }) => {
  return (
    <View style={settingsStyles.container}>
      <View style={settingsStyles.subContainer}>
        {component}
        <Text style={settingsStyles.title}>
          Are you sure you want to {text}?
        </Text>
        <View style={settingsStyles.header}>
          <Pressable
            style={[settingsStyles.cancelButton, { borderColor: color }]}
            onPress={() => cancel(false)}
          >
            <Text style={{ color: color, fontWeight: "800", fontSize: 15 }}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={[settingsStyles.logoutButton, { backgroundColor: color }]}
            onPress={() => functionPassed()}
          >
            <Text style={{ fontWeight: "600" }}>{text}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Verify
