import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";

import useReference from "../hooks/useReference";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { user, login, logout } = useAuth();

  const handleSignIn = () => {
    login("user@example.com", "123456");
  };

  const handleSignOut = () => {
    logout();
  };

  const handleSet = () => {
    setPump("new nva " + Math.random());
  };

  const [pump, setPump] = useReference("pump/1");

  return (
    <View style={styles.container}>
      <Text>Pump: {pump}</Text>

      <Text>{JSON.stringify(user?.email)}</Text>

      <Button title="login" onPress={handleSignIn} />
      <Button title="logout" onPress={handleSignOut} />

      <Button title="set" onPress={handleSet} />
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
