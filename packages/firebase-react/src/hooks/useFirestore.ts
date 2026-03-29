import { useFirebase } from "./useFirebase.ts";

export function useFirestore() {
  const value = useFirebase();

  if (!value || value.firestore === undefined) {
    throw new Error(
      "Firebase firestore isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.firestore;
}
