import { createContext, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getDatabase, ref, onValue, set } from "firebase/database";

// Ignoring warnings unsolved in current expo-firebase library.
import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
LogBox.ignoreLogs(["Setting a timer for a long period of time, i.e. multiple"]);

// Creating and exporting context
export const FirebaseContext = createContext();

export default function FirebaseWrapper({ children, firebaseConfig }) {
  // Firebase user for context
  const [user, setUser] = useState(null);

  // Login and logout functions (using email and password strategy)
  const login = (email, password) => {
    signInWithEmailAndPassword(getAuth(), email, password);
  };

  const logout = () => {
    signOut(getAuth());
  };

  const write = (reference, value) => {
    const databaseReference = ref(getDatabase(), reference);
    return set(databaseReference, value);
  };

  // Firebase initialization from prop config
  useEffect(() => {
    initializeApp(firebaseConfig);

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  // Collecting context value to share between children
  const context = {
    user,
    login,
    logout,
    write,
  };

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
}
