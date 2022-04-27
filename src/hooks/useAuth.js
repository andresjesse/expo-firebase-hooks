import { useState, useEffect } from "react";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    signInWithEmailAndPassword(getAuth(), email, password);
  };

  const logout = () => {
    signOut(getAuth());
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return { user, login, logout };
}
