import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";

export default function SettingsScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useContext(AppContext);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("Auth");
  };
const reset = async () => {
  Alert.alert("Reset App", "Are you sure you want to delete all data?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Yes",
      onPress: async () => {
        try {
          await AsyncStorage.clear();

          // RESET CONTEXT (IMPORTANT)
          setUser?.(null);
          setCourses?.([]);

          // FORCE NAVIGATION RESET
          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
        } catch (e) {
          console.log(e);
        }
      },
    },
  ]);
};
  return (
    <View style={[styles.outerContainer, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* HEADER */}
      <View style={[styles.headerContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText}]}>
          Manage your preferences
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 50 }}>
        {/* PROFILE */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.row}>
            <View style={styles.left}>
              <View style={[styles.iconBox, { backgroundColor: theme.primary }]}>
                <Ionicons name="person" size={16} color={theme.background} />
              </View>
              <View>
                <Text style={[styles.text, { color: theme.text }]}>
                  Student Profile
                </Text>
                <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
                  Manage your account info
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.subText} />
          </View>
        </View>

        {/* APPEARANCE */}
        <Text style={{ color: theme.secondaryText, marginTop: 20 }}>Appearance</Text>
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.row}>
            <View style={styles.left}>
              <View style={[styles.iconBox, { backgroundColor: theme.primary }]}>
                <Ionicons name="moon" size={16} color={theme.background} />
              </View>
              <Text style={[styles.text, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>

      {/* ACCOUNT */}
<Text style={{ color: theme.secondaryText, marginTop: 20 }}>Account</Text>
<View style={[styles.section, { backgroundColor: theme.card }]}>
  {/* Logout */}
  <TouchableOpacity style={styles.row} onPress={logout}>
    <View style={styles.left}>
      <View style={[styles.iconBox, { backgroundColor: theme.primary }]}>
        <Ionicons name="log-out" size={16} color={theme.background} />
      </View>
      <Text style={[styles.text, { color: theme.text }]}>Logout</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={theme.subText} />
  </TouchableOpacity>

  <View style={[styles.divider, { backgroundColor: theme.subText }]} />

  {/* Reset Data */}
  <TouchableOpacity style={styles.row} onPress={reset}>
    <View style={styles.left}>
      <View style={[styles.iconBox, { backgroundColor: theme.primary }]}>
        <Ionicons name="trash" size={16} color={theme.background} />
      </View>
      <Text style={[styles.text, { color: theme.text }]}>Reset Data</Text>
    </View>
  </TouchableOpacity>
</View>

{/* ABOUT */}
<Text style={{ color: theme.subText, marginTop: 20 }}>About</Text>
<View style={[styles.section, { backgroundColor: theme.card }]}>
  <View style={styles.row}>
    <View style={styles.left}>
      <View style={[styles.iconBox, { backgroundColor: theme.primary }]}>
        <Ionicons name="information-circle" size={16} color={theme.background} />
      </View>
      <View>
        <Text style={[styles.text, { color: theme.text }]}>Student Planner App</Text>
        <Text style={{ color: theme.secondaryText, fontSize: 12 }}>Version 1.0.0</Text>
      </View>
    </View>
      </View>
        </View>
      </ScrollView>
  {/* Bottom Navbar */}
<View
  style={[
    styles.navbar,
    {
      backgroundColor: theme.card,
      borderTopColor: theme.subText,
    },
  ]}
>
  <TouchableOpacity
    onPress={() => navigation.navigate("Home")}
    style={styles.navItem}
  >
    <Ionicons name="home" size={24} color={theme.text} />
    <Text style={[styles.navText, { color: theme.text }]}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => navigation.navigate("Courses")}
    style={styles.navItem}
  >
    <Ionicons name="book" size={24} color={theme.text} />
    <Text style={[styles.navText, { color: theme.text }]}>Courses</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => navigation.navigate("Settings")}
    style={styles.navItem}
  >
    <Ionicons name="settings" size={24} color={theme.text} />
    <Text style={[styles.navText, { color: theme.text }]}>Settings</Text>
  </TouchableOpacity>
</View>    
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, paddingTop: 20, paddingBottom: 60 },
navbar: {
  position: "absolute",
  bottom: 20,
  left: 0,
  right: 0,
  height: 65,
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  borderTopWidth: 1,
  zIndex: 1000,
},

navItem: {
  alignItems: "center",
  justifyContent: "center",
},

navText: {
  fontSize: 12,
  marginTop: 2,
},
  headerContainer: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { fontSize: 16, marginTop: 4 },
  section: {
    borderRadius: 18,
    paddingVertical: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 16, fontWeight: "600" },
  divider: { height: 1, opacity: 0.2, marginHorizontal: 15, marginVertical: 10 },
});