import AsyncStorage from "@react-native-async-storage/async-storage"
import { KEYS } from "./KEYS"

// ICONS
export const storeIcon = async (icon) => {
  try {
    await AsyncStorage.setItem(KEYS.ICON, icon)
  } catch (err) {
    throw err
  }
}

export const getIcon = async () => {
  try {
    const icon = await AsyncStorage.setItem(KEYS.ICON)
    return icon
  } catch (err) {
    throw err
  }
}
