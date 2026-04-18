import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../context/UserContext";
import { AppContext } from "../context/AppContext";

export default function EditProfileScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const { theme } = useContext(AppContext);

  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [gpa, setGpa] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setSemester(user.semester || "");
      setGpa(user.gpa || "");
      setCgpa(user.cgpa || "");
      setProfilePic(user.profilePic || null);
    }
  }, [user]);

  // Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // Update profile function
  const updateProfile = async () => {
    const updated = { ...user, name, semester, gpa, cgpa, profilePic };

    // Update current user in AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(updated));

    // Update users array in AsyncStorage if exists
    const storedUsers = await AsyncStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const newUsers = users.map((u) =>
        u.email === updated.email ? updated : u
      );
      await AsyncStorage.setItem("users", JSON.stringify(newUsers));
    }

    // Update context
    setUser(updated);

    alert("Profile Updated!");
    navigation.goBack(); // go back to Home screen
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Edit Profile
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile Picture */}
        <TouchableOpacity
          style={styles.profilePicContainer}
          onPress={pickImage}
        >
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color={theme.subText} />
          )}
          <Text style={{ color: theme.text, marginTop: 8 }}>
            Edit Profile Picture
          </Text>
        </TouchableOpacity>

        {/* Name */}
        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Ionicons name="person" size={20} color={theme.subText} style={styles.icon} />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor={theme.subText}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* Semester */}
        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Ionicons name="school" size={20} color={theme.subText} style={styles.icon} />
          <TextInput
            value={semester}
            onChangeText={setSemester}
            placeholder="Semester"
            placeholderTextColor={theme.subText}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* GPA */}
        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Ionicons name="stats-chart" size={20} color={theme.subText} style={styles.icon} />
          <TextInput
            value={gpa}
            onChangeText={setGpa}
            placeholder="GPA"
            keyboardType="numeric"
            placeholderTextColor={theme.subText}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* CGPA */}
        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Ionicons name="bar-chart" size={20} color={theme.subText} style={styles.icon} />
          <TextInput
            value={cgpa}
            onChangeText={setCgpa}
            placeholder="CGPA"
            keyboardType="numeric"
            placeholderTextColor={theme.subText}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* Update Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4b7bec" }]}
          onPress={updateProfile}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scroll: { paddingVertical: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  headerTitle: { fontSize: 22, fontWeight: "700", marginLeft: 15 },
  profilePicContainer: { alignItems: "center", marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, paddingVertical: 12 },
  button: {
    marginTop: 25,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#4b7bec",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});