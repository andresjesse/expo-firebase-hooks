import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
LogBox.ignoreLogs(["Setting a timer"]);

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "./src/services/firebaseApp";
import { FirebaseContext } from "./src/services/contexts/FirebaseContext";
import { useState } from "react";

export default function App() {
  // const user = signIn("user@example.com", 123456);

  // const db = getDatabase();
  // const reference = ref(db, "users/" + 1);

  // set(reference, {
  //   highscore: 123,
  // });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, "user@example.com", 123456).then(
      (user) => {
        // console.log(user);
        setUser(user);
      }
    );
  }, []);

  const handleSet = () => {
    const db = getDatabase();
    const reference = ref(db, "users/" + 1);

    set(reference, {
      highscore: 123,
    });
  };

  const handleGet = () => {
    const db = getDatabase();
    const reference = ref(db, "users/" + 1);

    onValue(reference, (snapshot) => {
      const { highscore } = snapshot.val();
      console.log(snapshot.val());
    });
  };

  if (!user) return <Text>Logging in..</Text>;

  return (
    <FirebaseContext.Provider value={user}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />

        <Button title="set" onPress={handleSet} />
        <Button title="get" onPress={handleGet} />
      </View>
    </FirebaseContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
