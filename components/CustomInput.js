import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function CustomInput({ placeholder, value, onChangeText, secure }) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  }
});