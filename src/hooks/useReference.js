import { getDatabase, onValue, ref, set } from "firebase/database";
import { useState, useEffect } from "react";

export default function useReference(reference) {
  const [currentVal, setCurrentVal] = useState(null);

  const updateReference = (newVal) => {
    const databaseReference = ref(getDatabase(), reference);
    set(databaseReference, newVal);
  };

  useEffect(() => {
    const databaseReference = ref(getDatabase(), reference);

    onValue(databaseReference, (snapshot) => {
      setCurrentVal(snapshot.val());
    });
  }, []);

  return [currentVal, updateReference];
}
