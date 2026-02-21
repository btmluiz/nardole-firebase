import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";

export function useAuth() {
  const value = useContext(FirebaseAppContext);

  if (!value || value.auth === undefined) {
    throw new Error(
      "Firebase auth isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.auth;
}
