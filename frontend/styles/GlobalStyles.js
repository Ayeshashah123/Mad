import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    padding: 15,
    borderRadius: 15,
    marginVertical: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  text: {
    fontSize: 16,
  },

  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  input: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
  }
});