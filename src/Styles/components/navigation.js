import { StyleSheet } from "react-native"
import { COLORS } from "../StyleColors"

export const navStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "12%",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  item: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: "100%",
    paddingBottom: 8,
  },
  label: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: "700",
    textAlign: "center",
  },
})
