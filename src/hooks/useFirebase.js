// Ignoring warnings unsolved in current expo-firebase library.
import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
LogBox.ignoreLogs(["Setting a timer for a long period of time, i.e. multiple"]);

import { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";

export default function useFirebase(firebaseConfig) {
  const [app, setApp] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setApp(app);
  }, []);

  return app;
}
