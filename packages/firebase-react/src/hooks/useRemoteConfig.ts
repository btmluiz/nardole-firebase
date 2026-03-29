import { useFirebase } from "./useFirebase.ts";

export function useRemoteConfig() {
  const value = useFirebase();

  if (!value || value.remoteConfig === undefined) {
    throw new Error(
      "Firebase remote config isn't found, did you forget to enable it in <FirebaseAppProvider>",
    );
  }

  return value.remoteConfig;
}
