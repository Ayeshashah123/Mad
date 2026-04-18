import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

const lightTheme = {
  background: "#F5F5F5",
  card: "#FFFFFF",
  text: "#000000",
  primary: "#000000",
  secondaryText: "gray",
};

const darkTheme = {
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  primary: "#FFFFFF",
  secondaryText: "#aaa",
};

const defaultCourses = [
  { name: "Geometry", tasks: 2, progress: 60, time: "9:00 AM" },
  { name: "Chemistry", tasks: 3, progress: 40, time: "10:30 AM" },
  { name: "Algebra", tasks: 1, progress: 80, time: "12:00 PM" },
  { name: "Physics", tasks: 2, progress: 50, time: "1:30 PM" },
  { name: "Biology", tasks: 4, progress: 30, time: "2:30 PM" },
  { name: "English", tasks: 1, progress: 90, time: "3:30 PM" },
  { name: "Computer Science", tasks: 3, progress: 70, time: "4:30 PM" },
];

export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = isDark ? darkTheme : lightTheme;

  // 🌙 TOGGLE THEME
const toggleTheme = async () => {
  const newValue = !isDark;
  setIsDark(newValue);
  await AsyncStorage.setItem("theme", JSON.stringify(newValue));
};
useEffect(() => {
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme !== null) {
        setIsDark(JSON.parse(savedTheme));
      }
    } catch (e) {
      console.log("Error loading theme:", e);
    }
  };

  loadTheme();
}, []);
  // 📥 LOAD courses on app start
useEffect(() => {
  const loadCourses = async () => {
    try {
      const saved = await AsyncStorage.getItem("courses");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (parsed && parsed.length >= 7) {
          const updated = parsed.map((course, index) => ({
            ...course,
            time: course.time || defaultCourses[index]?.time || "Not scheduled",
          }));

          setCourses(updated);
        } else {
          setCourses(defaultCourses);
          await AsyncStorage.setItem(
            "courses",
            JSON.stringify(defaultCourses)
          );
        }
      } else {
        setCourses(defaultCourses);
        await AsyncStorage.setItem(
          "courses",
          JSON.stringify(defaultCourses)
        );
      }
    } catch (e) {
      console.log("Error loading courses:", e);
      setCourses(defaultCourses);
    }

    setLoading(false);
  };

  loadCourses();
}, []);

  // 💾 SAVE whenever courses change
  useEffect(() => {
    const saveCourses = async () => {
      try {
        await AsyncStorage.setItem(
          "courses",
          JSON.stringify(courses)
        );
      } catch (e) {
        console.log("Error saving courses:", e);
      }
    };

    saveCourses();
  }, [courses]);

  const addCourse = (course) => {
    setCourses((prev) => [...prev, course]);
  };

  const removeCourse = (name) => {
    setCourses((prev) => prev.filter((c) => c.name !== name));
  };
  const studentInfo = {
  name: "Syeda Ayesha Fatima",
  sapId: "12345678",
};

  return (
    <AppContext.Provider
      value={{
        courses,
        addCourse,
        removeCourse,
        theme,
        isDark,
        toggleTheme,
        loading,
        studentInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};