import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const chooseStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    backgroundColor: COLORS.background,
    justifyContent: "flex-end",
  },
  listContainer: {
    flex: 1,
    padding: 16,
    marginTop: 18,
    backgroundColor: COLORS.surface,
    justifyContent: "flex-start",
    maxHeight: "40%",
    width: "100%",
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
  },
})
