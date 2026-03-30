import AsyncStorage from "@react-native-async-storage/async-storage"
import { KEYS } from "./KEYS"

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(KEYS.TOKEN, token)
  } catch (err) {
    throw err
  }
}

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(KEYS.TOKEN)
    return token
  } catch (err) {
    throw err
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.TOKEN)
  } catch (err) {
    throw err
  }
}