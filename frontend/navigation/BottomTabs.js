import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/CoursesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

     tabBarIcon: ({ focused, color }) => {
  let iconName;

  if (route.name === "Home") {
    iconName = focused ? "home" : "home-outline";
  } else if (route.name === "Courses") {
    iconName = focused ? "book" : "book-outline";
  } else if (route.name === "Settings") {
    iconName = focused ? "settings" : "settings-outline";
  }

  return <Ionicons name={iconName} size={22} color={color} />;
},

        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",

        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 15,
          right: 15,
          height: 65,
          borderRadius: 25,
          backgroundColor: "#fff",
          elevation: 5,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}