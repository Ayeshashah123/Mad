import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import NotesScreen from "../screens/NotesScreen";
import MovieScreen from "../screens/MovieScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="Movies" component={MovieScreen} />
    </Stack.Navigator>
  );
}