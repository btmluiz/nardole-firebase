import { useFirebase } from "./useFirebase.ts";

export function useDatabase() {
  const value = useFirebase();

  if (!value || value.database === undefined) {
    throw new Error(
      "Firebase database isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.database;
}
