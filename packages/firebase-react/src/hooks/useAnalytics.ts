import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";

export function useAnalytics() {
  const app = useContext(FirebaseAppContext);

  if (!app || !app.analytics) {
    throw new Error("Analytics is not enabled for this Firebase app");
  }

  return app.analytics;
}
