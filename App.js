import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import FirebaseWrapper, {
  FirebaseContext,
} from "./src/components/FirebaseWrapper";
import firebaseConfig from "./src/config/firebaseConfig";
import { useContext } from "react";
import Home from "./src/pages/Home";
import useFirebase from "./src/hooks/useFirebase";

// import { LogBox } from "react-native";
// LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
// LogBox.ignoreLogs(["Setting a timer"]);

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// // import firebaseApp from "./src/services/firebase";
// import { FirebaseContext } from "./src/contexts/FirebaseContext";
// import { useState } from "react";

export default function App() {
  // const user = signIn("user@example.com", 123456);

  // const db = getDatabase();
  // const reference = ref(db, "users/" + 1);

  // set(reference, {
  //   highscore: 123,
  // });

  // useEffect(() => {
  //   const auth = getAuth();

  //   signInWithEmailAndPassword(auth, "user@example.com", 123456).then(
  //     (user) => {
  //       // console.log(user);
  //       setUser(user);
  //     }
  //   );
  // }, []);

  // if (!user) return <Text>Logging in..</Text>;

  const firebaseApp = useFirebase(firebaseConfig);

  if (!firebaseApp) return <Text>Loading...</Text>;

  return (
    // <FirebaseWrapper firebaseConfig={firebaseConfig}>
    <Home />
    // </FirebaseWrapper>
  );
}
