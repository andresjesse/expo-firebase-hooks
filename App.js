import { Text } from "react-native";

import firebaseConfig from "./src/config/firebaseConfig";
import useFirebase from "./src/hooks/useFirebase";

import Home from "./src/pages/Home";

export default function App() {
  const firebaseApp = useFirebase(firebaseConfig);

  if (!firebaseApp) return <Text>Loading...</Text>;

  return <Home />;
}
