import { View, Image, Pressable, Text } from "react-native"
import { styles } from "../../Styles/components/ProfileIcon.js"

export default function ProfileIcon({
  navigation,
  userProfileUri,
  title,
  text,
  size = 24,
}) {
  const imageSource = userProfileUri
    ? { uri: userProfileUri }
    : require("../../../assets/default.png")

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
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
      </View>
      <Text style={[styles.title, size ? { fontSize: size } : null]}>
        {title}
      </Text>
      <Text style={styles.small}>{text}</Text>
    </View>
  )
}
