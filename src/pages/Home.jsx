import { View, ScrollView, Text, StyleSheet, Button } from "react-native";
import React from "react";

import useReference from "../hooks/useReference";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";

export default function Home() {
  // ============================================ Auth Example
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    login("user@example.com", "123456");
  };

  const handleLogout = () => {
    logout();
  };

  // ============================================ Single Reference Example
  const [myRef, setMyRef] = useReference(
    "myref/1",
    "optional default val (loading..)"
  );

  const handleUpdate = () => {
    setMyRef("RandVal: " + Math.random());
  };

  // ============================================ List Example
  const books = useList("books");

  const handleListCreate = () => {
    books.create({ author: "name" });
  };

  const handleListDelete = () => {
    if (books.data) {
      // getting first key as an example
      const key = Object.keys(books.data)[0];

      // any valid key can be used to delete
      books.remove(key);
    }
  };

  const handleListUpdate = () => {
    if (books.data) {
      // getting first key as an example
      const key = Object.keys(books.data)[0];

      const updatedObject = { author: "name" + Math.random() };

      // any valid key can be used to update
      books.update(key, updatedObject);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>User: {user?.email}</Text>
        <Button title="login" onPress={handleLogin} />
        <Button title="logout" onPress={handleLogout} />

        <Text>Single Ref: {myRef}</Text>
        <Button title="Update Reference" onPress={handleUpdate} />

        <Text>List: {JSON.stringify(books.data)}</Text>
        <Button title="List Create" onPress={handleListCreate} />
        <Button title="List Delete (first)" onPress={handleListDelete} />
        <Button title="List Update (first)" onPress={handleListUpdate} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
