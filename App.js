import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AppNavigator from "./frontend/navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProvider } from "./frontend/context/AppContext";
import { UserProvider } from "./frontend/context/UserContext";

export default function App() {
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await AsyncStorage.getItem("user");
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingUser(false);
      }
    };

    init();
  }, []);

  if (loadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AppProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </AppProvider>
  );
}