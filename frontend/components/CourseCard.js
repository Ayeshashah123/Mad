import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CourseCard({ course, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{course.name}</Text>
      <Text style={styles.time}>{course.time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    elevation: 4,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  time: { color: "#6B7280" },
});