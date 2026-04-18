import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { AppContext } from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";

export default function AuthScreen({ navigation }) {
  const { setUser } = useContext(UserContext);
  const { theme } = useContext(AppContext); // ✅ get theme

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // LOGIN
  const handleLogin = async () => {
    const storedUsers = await AsyncStorage.getItem("users");
    if (!storedUsers) return alert("No users found");

    const users = JSON.parse(storedUsers);
  const foundUser = users.find(
  u =>
    u.email === email.trim().toLowerCase() &&
    u.password === password
);
if (foundUser) {
  await AsyncStorage.setItem("user", JSON.stringify(foundUser)); // ✅ ADD THIS
  setUser(foundUser);
  navigation.replace("Home");

    } else {
      alert("User not found");
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const normalizedEmail = email.trim().toLowerCase();

    if (users.find(u => u.email === normalizedEmail)) {
      return alert("User already exists");
    }

  const newUser = {
  name: "Student",
  email: normalizedEmail,
  password: password, // ✅ ADD THIS LINE
  semester: "3",
  gpa: "3.5",
  cgpa: "3.6"
};

    users.push(newUser);
    await AsyncStorage.setItem("users", JSON.stringify(users));

  await AsyncStorage.setItem("user", JSON.stringify(newUser)); // ✅ ADD THIS
setUser(newUser);
navigation.replace("Home");
  };

  return (
   
       <ImageBackground
    source={require("../../assets/hello.jpg")}
    style={{ flex: 1 }}
    resizeMode="cover"
  >
    <View style={[styles.container, { backgroundColor: "rgba(0,0,0,0.4)" }]}>
      {/* Top Section */}
      <Ionicons name="school-outline" size={60} color={theme.text} />
      <Text style={[styles.title, { color: theme.text }]}>Hello!</Text>
      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        Welcome Student
      </Text>

      {/* Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          {isSignup ? "Sign Up" : "Login"}
        </Text>

        {/* Email */}
        <View style={[styles.inputContainer, { backgroundColor: theme.inputBackground, borderColor: theme.secondaryText }]}>
          <Ionicons name="mail-outline" size={18} color={theme.secondaryText} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.secondaryText}
            style={[styles.input, { color: theme.text }]}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={[styles.inputContainer, { backgroundColor: theme.inputBackground, borderColor: theme.secondaryText }]}>
          <Ionicons name="lock-closed-outline" size={18} color={theme.secondaryText} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.secondaryText}
            secureTextEntry
            style={[styles.input, { color: theme.text }]}
            onChangeText={setPassword}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.button }]}
          onPress={isSignup ? handleSignup : handleLogin}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            {isSignup ? "Sign Up" : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Toggle */}
        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={[styles.switchText, { color: theme.secondaryText }]}>
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
  },
  subtitle: {
    marginBottom: 30,
  },
  card: {
    width: "100%",
    borderRadius: 25,
    padding: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  button: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "600",
  },
  switchText: {
    marginTop: 15,
    textAlign: "center",
  },
});