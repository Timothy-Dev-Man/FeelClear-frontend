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

//USER
export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user))
  } catch (err) {
    throw err
  }
}

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user")
    return user ? JSON.parse(user) : null
  } catch (err) {
    console.log("Error getting user:", err)
    return null
  }
}

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.USER)
  } catch (err) {
    throw err
  }
}
