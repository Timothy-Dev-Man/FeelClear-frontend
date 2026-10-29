import { View, Image, Pressable } from "react-native"
import { COLORS } from "../Styles/StyleColors"

const ProfileList = ({ list = [], selected, onSelect }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
      }}
    >
      {list.map((pfp, index) => (
        <Pressable
          key={index}
          onPress={() => onSelect(pfp)}
          style={{ margin: 10 }} // replace gap
        >
          <Image
            source={{ uri: pfp }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              borderWidth: selected === pfp ? 3 : 0,
              borderColor: COLORS.forest,
            }}
          />
        </Pressable>
      ))}
    </View>
  )
}

export default ProfileList
