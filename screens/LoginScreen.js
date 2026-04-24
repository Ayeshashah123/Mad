import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email || !password) {
      Alert.alert("Error", "Fill all fields");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Invalid email");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Min 6 characters");
      return false;
    }
    return true;
  };

const handleAuth = async (type) => {
  if (!validate()) return;

  setLoading(true);
  try {
    if (type === "login") {
      console.log("Trying login...");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success");
    } else {
      console.log("Trying signup...");
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup success");
    }

    console.log("Navigating to Notes...");
    navigation.replace("Notes");

  } catch (e) {
    console.log("ERROR:", e.message);
    Alert.alert("Error", e.message);
  }
  setLoading(false);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAuth("login")}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.outline]}
            onPress={() => handleAuth("signup")}
          >
            <Text style={styles.outlineText}>Signup</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 10,
    marginVertical: 5,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "red",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  outlineText: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
});