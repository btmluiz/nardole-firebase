import { useFirebase } from "./useFirebase.ts";

export function useStorage() {
  const value = useFirebase();

  if (!value || value.storage === undefined) {
    throw new Error(
      "Firebase storage isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.storage;
}
