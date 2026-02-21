import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";

export function useDatabase() {
  const value = useContext(FirebaseAppContext);

  if (!value || value.database === undefined) {
    throw new Error(
      "Firebase database isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.database;
}
