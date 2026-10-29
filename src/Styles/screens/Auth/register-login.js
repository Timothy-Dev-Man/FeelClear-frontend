import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 28,
    backgroundColor: COLORS.background,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 26,
    gap: 16,
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontFamily: "serif",
    fontWeight: "700",
    color: COLORS.indigo,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.mutedBlueGray,
    marginTop: 4,
  },
  authSpacer: {
    height: 28,
  },

  inputBox: {
    width: "100%",
    justifyContent: "center",
    gap: 12,
  },

  input: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    width: "100%",
    minHeight: 54,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.indigo,
  },

  button: {
    backgroundColor: COLORS.mainButton,
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.62,
  },

  link: {
    marginTop: 8,
    textAlign: "center",
    color: COLORS.forest,
    fontSize: 14,
    fontWeight: "600",
  },
  error: {
    color: COLORS.error,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
  },
})
