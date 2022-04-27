import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

import useReference from "../hooks/useReference";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { user, login, logout } = useAuth();
  const [myRef, setMyRef] = useReference(
    "myref/1",
    "optional default val (loading..)"
  );

  const handleLogin = () => {
    login("user@example.com", "123456");
  };

  const handleLogout = () => {
    logout();
  };

  const handleUpdate = () => {
    setMyRef("RandVal: " + Math.random());
  };

  return (
    <View style={styles.container}>
      <Text>Ref: {myRef}</Text>
      <Text>User: {user?.email}</Text>

      <Button title="login" onPress={handleLogin} />
      <Button title="logout" onPress={handleLogout} />
      <Button title="Update Ref (Realtime)" onPress={handleUpdate} />
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
