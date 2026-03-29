import { useContext } from "react";
import { FirebaseAppContext } from "../providers/FirebaseAppProvider.tsx";


export function useFirebase() {
  return useContext(FirebaseAppContext);
}
