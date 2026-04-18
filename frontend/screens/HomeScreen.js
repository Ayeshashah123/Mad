import React, { useContext , useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { StatusBar } from "react-native";


import { Ionicons } from "@expo/vector-icons";
import { UserContext} from "../context/UserContext";
import { AppContext } from "../context/AppContext";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const { theme, studentInfo,isDark } = useContext(AppContext); // get dark/light theme
  const [quote, setQuote] = useState("");
useEffect(() => {
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      setQuote(data.quote); 
    } catch (error) {
      console.log("Fetch error:", error);
      setQuote("Failed to load quote");
    }
  };

  fetchQuote();
}, []);

  return (
    <View style={[styles.outerContainer, { backgroundColor: theme.background }]}>

    <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.headerContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Home</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ marginBottom: 15 }}>
  <Text style={{ color: theme.text, fontStyle: "italic" }}>
    Quote:
  {quote ? quote : "Loading quote..."}
</Text>
</View>
        {/* Dashboard Card */}
        <View style={[styles.dashboardCard, { backgroundColor: theme.card }]}>
          {/* Profile + Edit */}
          <View style={styles.profileRow}>
            <View style={styles.profileCard}>
            {user?.profilePic ? (
  <Image
    source={{ uri: user.profilePic }}
    style={{ width: 80, height: 80, borderRadius: 40 }}
  />
) : (
  <Ionicons name="person-circle-outline" size={80} color="#ccc" />
)}
              <View style={{ marginLeft: 12 }}>
  <Text style={[styles.profileName, { color: theme.text }]}>
    {user?.name || studentInfo.name || "Student"}
  </Text>

  <Text style={[styles.profileEmail, { color: theme.secondaryText }]}>
    {user?.email}
  </Text>

  <Text
    style={{
      fontSize: 12,
      color: theme.secondaryText,
      marginTop: 2,
    }}
  >
    SAP ID: {studentInfo.sapId}
  </Text>
  <View style={{  }}>
  <Text style={{ fontSize: 12, color: theme.secondaryText, marginBottom: 2 }}>
    Semester: {user?.semester}
  </Text>

  <Text style={{ fontSize: 12, color: theme.secondaryText, marginBottom: 2 }}>
    GPA: {user?.gpa}
  </Text>

  <Text style={{ fontSize: 12, color: theme.secondaryText }}>
    CGPA: {user?.cgpa}
  </Text>
</View>
</View>

            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
              <Text style={[styles.editText, { color: theme.secondaryText }]}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Top Cards */}
          <View style={styles.row}>
            <View style={[styles.smallCard, { backgroundColor: theme.cardSecondary }]}>
              <Ionicons name="create-outline" size={18} color={theme.text} />
              <Text style={[styles.cardLabel, { color: theme.secondaryText }]}>Homework to do</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>2</Text>
            </View>
            <View style={[styles.smallCard, { backgroundColor: theme.cardSecondary }]}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.text} />
              <Text style={[styles.cardLabel, { color: theme.secondaryText }]}>Attendance score</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>97%</Text>
            </View>
          </View>

          {/* Bottom Combined Card */}
          <View style={[styles.combinedCard, { backgroundColor: theme.cardSecondary }]}>
            <View style={styles.bottomCardRow}>
              <Ionicons name="stats-chart-outline" size={18} color={theme.text} />
              <Text style={[styles.cardLabel, { color: theme.secondaryText }]}>Average grade</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>10</Text>
            </View>
            <View style={styles.bottomCardRow}>
              <Ionicons name="calendar-outline" size={18} color={theme.text} />
              <Text style={[styles.cardLabel, { color: theme.secondaryText }]}>Classes today</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>6</Text>
            </View>
          </View>

          {/* Next Class */}
          <View style={[styles.nextClass, { backgroundColor: theme.cardSecondary }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.nextLabel, { color: theme.secondaryText }]}>Next class</Text>
              <Text style={[styles.nextTitle, { color: theme.text }]}>Biology</Text>
            </View>
            <View>
              <Text style={[styles.nextTime, { color: theme.text }]}>13:25</Text>
              <Text style={[styles.nextTime, { color: theme.text }]}>14:05</Text>
              <Text style={[styles.nextRoom, { color: theme.secondaryText }]}>204 classroom</Text>
            </View>
          </View>

          {/* Upcoming Assignments */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Upcoming Assignments</Text>
            <View style={styles.itemRow}>
              <Text style={[styles.itemText, { color: theme.text }]}>Math Homework</Text>
              <Text style={[styles.itemDate, { color: theme.secondaryText }]}>Due: 05 Apr</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={[styles.itemText, { color: theme.text }]}>English Essay</Text>
              <Text style={[styles.itemDate, { color: theme.secondaryText }]}>Due: 06 Apr</Text>
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
  outerContainer: { flex: 1,paddingTop:20,paddingBottom:60 },
  headerContainer: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  navbar: {
    paddingtop:30,

  position: "absolute",
  bottom: 20
  ,
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
  title: { fontSize: 28, fontWeight: "700" ,fontFamily: "Poppins"},
  subtitle: { fontSize: 16, marginTop: 4 },

  scrollContent: {
  padding: 20,
  paddingTop: 30,
  paddingBottom: 100, // IMPORTANT
},

  dashboardCard: {
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },

  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileCard: { flexDirection: "row", alignItems: "center" },
  profileImage: { width: 55, height: 55, borderRadius: 30 },
  profileName: { fontSize: 16, fontWeight: "600" },
  profileEmail: { fontSize: 13 },
  editText: { fontWeight: "500" },

  row: { flexDirection: "row", marginBottom: 12 },
  smallCard: { flex: 1, padding: 15, marginRight: 10, borderRadius: 15 },
  cardLabel: { marginTop: 8, fontSize: 13 },
  cardValue: { fontSize: 22, fontWeight: "700", marginTop: 5 },

  combinedCard: { borderRadius: 15, padding: 15, marginVertical: 15 },
  bottomCardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },

  nextClass: { flexDirection: "row", borderRadius: 15, padding: 18, marginBottom: 15 },
  nextLabel: { marginBottom: 5 },
  nextTitle: { fontSize: 22, fontWeight: "700" },
  nextTime: { fontWeight: "600" },
  nextRoom: { fontSize: 12 },

  section: { marginTop: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  itemText: { fontSize: 14 },
  itemDate: { fontSize: 12 },
});