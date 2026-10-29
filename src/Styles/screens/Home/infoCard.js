import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const InfoCardStyles = StyleSheet.create({
  rowCard: {
    width: "100%",
    minHeight: 64,
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 12,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 14,
    marginTop: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.indigo,
  },
})
