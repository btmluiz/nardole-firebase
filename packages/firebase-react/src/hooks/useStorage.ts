import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";

export function useStorage() {
  const value = useContext(FirebaseAppContext);

  if (!value || value.storage === undefined) {
    throw new Error(
      "Firebase storage isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.storage;
}
