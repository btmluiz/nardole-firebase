import { useFirebase } from "./useFirebase.ts";

export function useAuth() {
  const value = useFirebase();

  if (!value || value.auth === undefined) {
    throw new Error(
      "Firebase auth isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.auth;
}
