import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { AppContext } from "../context/AppContext";

export default function CustomButton({ title, onPress }) {
  const { theme } = useContext(AppContext);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 12,
        marginVertical: 10,
      }}
      onPress={onPress}
    >
      <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}