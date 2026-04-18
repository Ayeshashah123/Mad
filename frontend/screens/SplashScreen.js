import React, { useEffect, useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

export default function SplashScreen({ navigation }) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        if (data) {
          setUser(JSON.parse(data));
        navigation.replace("Auth"); // user exists → go to main
        } else {
          navigation.replace("Auth"); // no user → go to login/signup
        }
      } catch (error) {
        console.log("Error reading AsyncStorage:", error);
        navigation.replace("Auth"); 
      }
    };

    checkUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}