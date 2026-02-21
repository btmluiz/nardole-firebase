import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";

export function usePerformance() {
  const value = useContext(FirebaseAppContext);

  if (!value || value.performance === undefined) {
    throw new Error(
      "Firebase performance isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.performance;
}
