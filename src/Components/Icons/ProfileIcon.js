import { View, Image, Pressable, Text } from "react-native"
import { styles } from "../../Styles/components/ProfileIcon.js"

export default function ProfileIcon({ navigation, userProfileUri }) {
  const imageSource = userProfileUri
    ? { uri: userProfileUri }
    : require("../../../assets/default.png")

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("ChooseIcon")}
      >
        <Image
          source={imageSource}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#fff",
            overflow: "hidden",
          }}
        />
      </Pressable>
      <Text style={styles.title}>Your avatar</Text>
      <Text style={styles.small}>This can be changed in settings.</Text>
    </View>
  )
}
