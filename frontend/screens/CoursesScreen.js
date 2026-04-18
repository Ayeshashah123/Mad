import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
  
} from "react-native";

import { AppContext } from "../context/AppContext";

export default function CoursesScreen({ navigation }) {
  const { theme, courses, addCourse } = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [newCourse, setNewCourse] = useState("");

  const addCourseHandler = () => {
    if (!newCourse.trim()) return;

    const newItem = {
      name: newCourse.trim(),
      tasks: 3,
      progress: 0,
      time: "Not scheduled",
    };

    addCourse(newItem);
    setNewCourse("");
    setModalVisible(false);
  };

  return (
    <View style={[styles.outerContainer, {backgroundColor: theme.background }]}>
      {/* HEADER: Styled like HomeScreen */}
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: theme.card, shadowColor: "#000" },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Classes</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Continue learning and complete your tasks
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        {/* SUMMARY */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
              Total Courses
            </Text>
            <Text style={{ color: theme.text, fontSize: 22, fontWeight: "700" }}>
              {courses.length}
            </Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
              Pending Tasks
            </Text>
            <Text style={{ color: theme.text, fontSize: 22, fontWeight: "700" }}>
              {courses.reduce((acc, c) => acc + c.tasks, 0)}
            </Text>
          </View>
        </View>

        {/* COURSES LIST */}
        {courses.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("CourseDetails", { course: item.name })
            }
            style={[styles.courseCard, { backgroundColor: theme.card }]}
          >
            <View style={styles.courseCardRow}>
              <View>
                <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
                  {item.tasks} tasks pending
                </Text>
                <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
                  {item.time}
                </Text>
                <Text
                  style={{ color: theme.text, fontSize: 20, fontWeight: "600" }}
                >
                  {item.name}
                </Text>
              </View>

              <Ionicons name="book-outline" size={22} color={theme.text} />
            </View>

            {/* PROGRESS BAR */}
            <View
              style={{
                height: 6,
                backgroundColor: theme.secondaryText,
                opacity: 0.2,
                borderRadius: 10,
                marginTop: 15,
              }}
            >
              <View
                style={{
                  width: `${item.progress}%`,
                  height: "100%",
                  backgroundColor: theme.text,
                  borderRadius: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        ))}

        {/* ADD NEW COURSE BUTTON */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.addButton, { backgroundColor: theme.primary }]}
        >
          <Text style={{ color: theme.background, fontWeight: "600" }}>
            + Add New Course
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.card,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 10,
              }}
            >
              Add Course
            </Text>

            <TextInput
              placeholder="Course name"
              placeholderTextColor={theme.secondaryText}
              value={newCourse}
              onChangeText={setNewCourse}
              style={{
                borderWidth: 1,
                borderColor: theme.secondaryText,
                borderRadius: 10,
                padding: 10,
                color: theme.text,
                marginBottom: 15,
              }}
            />

            <TouchableOpacity
              onPress={addCourseHandler}
              style={{
                backgroundColor: theme.primary,
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: theme.background }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

// --- Styles ---
const styles = StyleSheet.create({outerContainer: {
    flex: 1,
    paddingTop: 20,   // space from status bar
    paddingBottom: 50 // avoid content hiding behind bottom nav
},
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
    paddingTop:20,
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { fontSize: 16, marginTop: 4 },

  summaryRow: {
    paddingTop:20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  summaryCard: {
    padding: 15,
    borderRadius: 15,
    width: "48%",
  },

  courseCard: {
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
  },
  courseCardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

  addButton: {
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
});