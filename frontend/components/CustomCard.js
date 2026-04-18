import React from "react";
import { View, StyleSheet } from "react-native";

export default function CustomCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 22,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
});