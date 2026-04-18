import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import CourseDetailsScreen from "../screens/CourseDetailsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import CoursesScreen from "../screens/CoursesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* START APP HERE */}
        <Stack.Screen name="Auth" component={AuthScreen} />

        {/* MAIN FLOW */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Courses" component={CoursesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        {/* EXTRA */}
        <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}