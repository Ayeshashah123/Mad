import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function NotesScreen({ navigation }) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return; // 🔥 safety check

    const q = query(
      collection(db, "notes"),
      where("userId", "==", user.uid) // ✅ ONLY this user's notes
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(data);
    });

    return unsubscribe;
  }, []);

  const addNote = async () => {
    if (!note.trim()) return;

    const user = auth.currentUser;

    await addDoc(collection(db, "notes"), {
      text: note,
      userId: user.uid, // ✅ attach user
    });

    setNote("");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>

      {/* HEADER + LOGOUT */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Your Notes</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Write a note..."
        placeholderTextColor="#aaa"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.btnText}>Add Note</Text>
      </TouchableOpacity>

      {notes.length === 0 ? (
        <Text style={styles.empty}>No notes yet</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.note}>{item.text}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#444" }]}
        onPress={() => navigation.navigate("Movies")}
      >
        <Text style={styles.btnText}>Go to Movies</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  logout: {
    color: "red",
    fontWeight: "bold",
    fontSize: 14,
  },

  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
  },

  note: {
    color: "#fff",
  },

  empty: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

<formik
initialValue={{name:"",email:""}}
onSubmit={(values)=>{
  console.log(values);
}}
>
  {(props)=>(
    <View style={{}}>
      <TextInput
      placeholder="Enter Name:"
      onchangeText={props.handleChange("name")}
      value={props.values.name}
      />
      <TextInput
      placeholder="Enter email"
      onChangeText={{props.handleChange("email")}}
          value={props.values.email}

      />
    </View>
  )}
</formik>