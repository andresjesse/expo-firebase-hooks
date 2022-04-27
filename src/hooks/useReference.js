const write = (reference, value) => {
  const databaseReference = ref(getDatabase(), reference);
  return set(databaseReference, value);
};

const read = (reference) => {
  const databaseReference = ref(getDatabase(), reference);

  onValue(reference, (snapshot) => {
    const { highscore } = snapshot.val();
    console.log(snapshot.val());
  });
};
