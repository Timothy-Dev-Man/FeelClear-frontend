import { StyleSheet } from "react-native"
import { COLORS, SPACING } from "../StyleColors"

export const navStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 72,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    zIndex: 10,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 56,
    gap: 4,
    paddingVertical: SPACING.xs,
  },
  label: {
    color: COLORS.mutedBlueGray,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  activeLabel: {
    color: COLORS.forest,
    fontWeight: "700",
  },
})
