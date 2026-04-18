import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { AppContext } from "../context/AppContext";

export default function CourseDetailsScreen({ route, navigation }) {
  const { theme, removeCourse } = useContext(AppContext);
  const { course } = route.params;

  const [dropModal, setDropModal] = useState(false);
  const [reason, setReason] = useState("");

  const dropReasons = [
    "Too difficult",
    "No interest anymore",
    "Schedule conflict",
    "Already completed content",
  ];

  const handleDrop = () => {
    removeCourse(course); // make sure course is NAME string
    setDropModal(false);
    setReason("");
    navigation.goBack();
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerCard}>
        <Text style={styles.title}>{course}</Text>
        <Text style={styles.subText}>Course Overview & Details</Text>
      </View>

      {/* INFO */}
      <View style={styles.card}>
        <Text style={styles.label}>Instructor</Text>
        <Text style={styles.value}>👨‍🏫 Dr. Ahmed</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Timing</Text>
        <Text style={styles.value}>⏰ 10:00 AM - 12:00 PM</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Room</Text>
        <Text style={styles.value}>🏫 204</Text>
      </View>

      {/* BUTTONS */}
      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>View Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setDropModal(true)}
        style={styles.dangerBtn}
      >
        <Text style={styles.dangerBtnText}>Drop Course</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={dropModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Why are you dropping this course?
            </Text>

            {dropReasons.map((r, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setReason(r)}
                style={[
                  styles.reasonBtn,
                  reason === r && { backgroundColor: theme.primary },
                ]}
              >
                <Text
                  style={{
                    color: reason === r ? theme.background : theme.text,
                  }}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            ))}

            <TextInput
              placeholder="Other reason (optional)"
              placeholderTextColor={theme.secondaryText}
              value={reason}
              onChangeText={setReason}
              style={styles.input}
            />

            <TouchableOpacity onPress={handleDrop} style={styles.confirmBtn}>
              <Text style={styles.confirmText}>Confirm Drop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ✅ THEME-BASED STYLES */
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },

    headerCard: {
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 25,
      marginBottom: 20,
    },

    title: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.text,
    },

    subText: {
      color: theme.secondaryText,
      marginTop: 5,
    },

    card: {
      backgroundColor: theme.card,
      padding: 18,
      borderRadius: 20,
      marginBottom: 15,
    },

    label: {
      color: theme.secondaryText,
    },

    value: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "600",
    },

    primaryBtn: {
      backgroundColor: theme.primary,
      padding: 16,
      borderRadius: 20,
      alignItems: "center",
      marginBottom: 10,
    },

    primaryBtnText: {
      color: theme.background,
      fontWeight: "700",
    },

    dangerBtn: {
      
      backgroundColor: theme.card,
      padding: 16,
      borderRadius: 20,
      alignItems: "center",
    },

    dangerBtnText: {
      color: theme.primary,
      fontWeight: "700",
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      padding: 20,
    },

    modalBox: {
      backgroundColor: theme.card,
      borderRadius: 25,
      padding: 20,
    },

    modalTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 10,
    },

    reasonBtn: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: theme.background,
      marginBottom: 10,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.secondaryText,
      borderRadius: 12,
      padding: 10,
      marginTop: 10,
      marginBottom: 15,
      color: theme.text,
    },

    confirmBtn: {
      backgroundColor:  theme.background,
      padding: 14,
      borderRadius: 15,
      alignItems: "center",
    },

    confirmText: {
      color: theme.primary,
      fontWeight: "700",
    },
  });