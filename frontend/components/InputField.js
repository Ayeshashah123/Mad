import { View, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export default function CustomCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 20,
    marginVertical: 10,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
  },
});