import { useFirebase } from "./useFirebase.ts";

export function usePerformance() {
  const value = useFirebase();

  if (!value || value.performance === undefined) {
    throw new Error(
      "Firebase performance isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.performance;
}
