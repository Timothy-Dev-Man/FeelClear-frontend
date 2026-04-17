import { StyleSheet } from "react-native"
import { COLORS } from "../StyleColors"

export const navStyles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
    borderTopWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 10,
  },
  item: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: "100%",
    paddingBottom: 8,
  },
  label: {
    fontSize: 25,
    marginTop: 8,
    fontWeight: "900",
    textAlign: "center",
  },
})
