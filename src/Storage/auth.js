import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"
import * as SecureStore from "expo-secure-store"
import { KEYS } from "./KEYS"

export const storeToken = async (token) => {
  if (typeof token !== "string" || token.length === 0) {
    throw new Error("A valid authentication token is required.")
  }

  if (Platform.OS === "web") {
    await AsyncStorage.setItem(KEYS.TOKEN, JSON.stringify(token))
    return
  }

  await SecureStore.setItemAsync(KEYS.TOKEN, token)
}

export const getToken = async () => {
  if (Platform.OS === "web") {
    const storedToken = await AsyncStorage.getItem(KEYS.TOKEN)
    if (!storedToken) return null

    try {
      return JSON.parse(storedToken)
    } catch {
      return storedToken
    }
  }

  const secureToken = await SecureStore.getItemAsync(KEYS.TOKEN)
  if (secureToken) return secureToken

  const legacyToken = await AsyncStorage.getItem(KEYS.TOKEN)
  if (!legacyToken) return null

  let token = legacyToken
  try {
    token = JSON.parse(legacyToken)
  } catch { }

  if (typeof token !== "string" || token.length === 0) return null

  await SecureStore.setItemAsync(KEYS.TOKEN, token)
  await AsyncStorage.removeItem(KEYS.TOKEN)
  return token
}

export const removeToken = async () => {
  await Promise.all([
    AsyncStorage.removeItem(KEYS.TOKEN),
    Platform.OS === "web" ? Promise.resolve() : SecureStore.deleteItemAsync(KEYS.TOKEN),
  ])
}
