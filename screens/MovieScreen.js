import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function MovieScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://reactnative.dev/movies.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movies</Text>

      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.year}>{item.releaseYear}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  header: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  year: { color: "red" },
});