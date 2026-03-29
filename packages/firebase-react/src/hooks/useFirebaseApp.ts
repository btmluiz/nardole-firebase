import { useFirebase } from "./useFirebase.ts";

export function useFirebaseApp() {
  const value = useFirebase();

  if (!value || value.app === undefined) {
    throw new Error(
      "Firebase app isn't found, did you forget to wrap your app in <FirebaseAppProvider>",
    );
  }

  return value.app;
}
