import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";

import { FirebaseContext } from "../components/FirebaseWrapper";
import useReference from "../hooks/useReference";

export default function Home() {
  const firebaseContext = useContext(FirebaseContext);

  const handleSignIn = () => {
    firebaseContext.login("user@example.com", "123456");
  };

  const handleSignOut = () => {
    firebaseContext.logout();
  };

  const handleSet = () => {
    // firebaseContext
    //   .write("users/2", "test string")
    //   .then(() => console.log("write ok!"));

    setPump("new nva");
  };

  const handleGet = () => {
    // const db = getDatabase();
    // const reference = ref(db, "users/" + 1);
    // onValue(reference, (snapshot) => {
    //   const { highscore } = snapshot.val();
    //   console.log(snapshot.val());
    // });
  };

  const [pump, setPump] = useReference("pump/1");

  return (
    <View style={styles.container}>
      <Text>Pump: {pump}</Text>

      <Text>{JSON.stringify(firebaseContext?.user?.email)}</Text>

      <Button title="login" onPress={handleSignIn} />
      <Button title="logout" onPress={handleSignOut} />

      <Button title="set" onPress={handleSet} />
      <Button title="get" onPress={handleGet} />
    </View>
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
