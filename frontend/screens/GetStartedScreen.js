import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
export default function GetStartedScreen({ navigation }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: "#F5F5F5",
      justifyContent: "center",
      padding: 25
    }}>
      
      <Text style={{ fontSize: 30, fontWeight: "700", marginBottom: 20 }}>
        Student’s App
      </Text>

      <Text style={{ fontSize: 20, marginBottom: 40 }}>
        Get your grades to the next level
      </Text>

      <TouchableOpacity
        onPress={() => navigation.replace("Auth")}
        style={{
          backgroundColor: "#000",
          padding: 18,
          borderRadius: 25,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Let’s go!</Text>
      </TouchableOpacity>

    </View>
  );
}