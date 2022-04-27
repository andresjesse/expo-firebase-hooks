import { getDatabase, onValue, ref, set } from "firebase/database";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";

export default function useReference(reference) {
  const [currentVal, setCurrentVal] = useState(null);

  const updateReference = (newVal) => {
    const databaseReference = ref(getDatabase(), reference);
    set(databaseReference, newVal);
  };

  const { user } = useAuth();

  useEffect(() => {
    const databaseReference = ref(getDatabase(), reference);

    unsubscribeCallback = onValue(databaseReference, (snapshot) => {
      setCurrentVal(snapshot.val());
    });

    return unsubscribeCallback;
  }, [user]);

  return [currentVal, updateReference];
}
