import { View, Image, Pressable, Text } from "react-native"
import { styles } from "../../Styles/screens/Auth/register-login"
import { useEffect, useState } from "react"
import ProfileList from "../../Components/ProfileItem"
import { IconsFetch } from "../../Api/auth"
import { chooseStyles } from "../../Styles/screens/Auth/chooseIcon"
import ProfileIcon from "../../Components/Icons/ProfileIcon"

export default function ChooseIcon({ navigation }) {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function loadIcons() {
      const data = await IconsFetch()
      setImages(data)
    }
    loadIcons()
  }, [])

  function handleSetIcon() {
    if (!selected) return

    navigation.navigate({
      name: "Register",
      params: { selectedIcon: selected },
      merge: true,
    })
  }

  return (
    <View style={chooseStyles.container}>
      <ProfileIcon userProfileUri={selected} />
      <Pressable style={styles.button} onPress={handleSetIcon}>
        <Text style={styles.buttonText}>Select</Text>
      </Pressable>
      <View style={chooseStyles.listContainer}>
        <ProfileList list={images} selected={selected} onSelect={setSelected} />
      </View>
    </View>
  )
}
