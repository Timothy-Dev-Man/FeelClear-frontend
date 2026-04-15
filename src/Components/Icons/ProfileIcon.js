import { View, Image, Pressable, Text } from "react-native"
import { styles } from "../../Styles/components/ProfileIcon.js"

export default function ProfileIcon({
  userProfileUri,
  title,
  text,
  size = 24,
  extraContent,
  wrapperStyles,
  onPress,
}) {
  const imageSource = userProfileUri
    ? { uri: userProfileUri }
    : require("../../../assets/default.png")

  return (
    <View
      style={[
        styles.container,
        wrapperStyles?.padding ? { padding: wrapperStyles.padding } : null,
      ]}
    >
      <View style={wrapperStyles?.wrapper}>
        <Pressable style={styles.pressable} onPress={onPress}>
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

      {extraContent?.map((item, index) => (
        <View key={index}>{item}</View>
      ))}
    </View>
  )
}
