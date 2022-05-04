import {
  getDatabase,
  onValue,
  ref,
  set,
  push,
  remove as fbRemove,
} from "firebase/database";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";

export default function useList(reference) {
  const [data, setData] = useState(null);

  const create = (newVal) => {
    const databaseReference = ref(getDatabase(), reference);
    const newRef = push(databaseReference);
    set(newRef, newVal);
  };

  const remove = (key) => {
    const databaseReference = ref(getDatabase(), reference + "/" + key);
    fbRemove(databaseReference);
  };

  const update = (key, newVal) => {
    const databaseReference = ref(getDatabase(), reference + "/" + key);
    set(databaseReference, newVal);
  };

  const { user } = useAuth();

  useEffect(() => {
    const databaseReference = ref(getDatabase(), reference);

    unsubscribeCallback = onValue(databaseReference, (snapshot) => {
      setData(snapshot.val());
    });

    return unsubscribeCallback;
  }, [user]);

  return { data, create, remove, update };
}
