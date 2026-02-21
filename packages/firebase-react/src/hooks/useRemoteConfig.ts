import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";

export function useRemoteConfig() {
  const value = useContext(FirebaseAppContext);

  if (!value || value.remoteConfig === undefined) {
    throw new Error(
      "Firebase remote config isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.remoteConfig;
}
