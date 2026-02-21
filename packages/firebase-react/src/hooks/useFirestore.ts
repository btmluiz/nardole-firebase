import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";

export function useFirestore() {
  const value = useContext(FirebaseAppContext);

  if (!value || value.firestore === undefined) {
    throw new Error(
      "Firebase firestore isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.firestore;
}
