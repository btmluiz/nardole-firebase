import { useFirebase } from "./useFirebase.ts";

export function useAnalytics() {
  const value = useFirebase();

  if (!value || !value.analytics) {
    throw new Error("Analytics is not enabled for this Firebase app");
  }

  return value.analytics;
}
