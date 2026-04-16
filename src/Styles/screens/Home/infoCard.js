import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const InfoCardStyles = StyleSheet.create({
  rowCard: {
    width: "100%",
    height: 70,
    backgroundColor: COLORS.mainDarkBackground,
    borderRadius: 50,
    shadowColor: "#6C476A",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
})
