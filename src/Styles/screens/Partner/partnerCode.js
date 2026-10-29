import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const partnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    backgroundColor: COLORS.background,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontFamily: "serif",
    fontWeight: "700",
    color: COLORS.indigo,
    marginBottom: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },
  code: {
    letterSpacing: 8,
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
    textAlign: "center",
    color: COLORS.mutedBlueGray,
  },
  codeSection: {
    marginTop: 12,
    marginBottom: 16,
  },
  codeBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderColor: COLORS.border,
    borderWidth: 1,
    minHeight: 64,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  status: {
    color: COLORS.mutedBlueGray,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  retry: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  retryText: {
    color: COLORS.forest,
    fontWeight: "700",
  },
})
