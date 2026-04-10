import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const partnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 90,
    backgroundColor: COLORS.mainDarkBackground,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 10,
    color: COLORS.subTitleText,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 25,
    textAlign: "center",
    color: COLORS.subTitleText,
  },
})
