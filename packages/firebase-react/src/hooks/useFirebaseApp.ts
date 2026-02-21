import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";

export function useFirebaseApp() {
  const value = useContext(FirebaseAppContext);

  if (!value || value.app === undefined) {
    throw new Error(
      "Firebase app isn't found, did you forget to wrap your app in <FirebaseAppProvider>",
    );
  }

  return value.app;
}
