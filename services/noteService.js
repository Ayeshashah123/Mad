import { db } from "../firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export const addNote = async (text) => {
  await addDoc(collection(db, "notes"), { text });
};

export const subscribeNotes = (setNotes) => {
  return onSnapshot(collection(db, "notes"), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotes(data);
  });
};