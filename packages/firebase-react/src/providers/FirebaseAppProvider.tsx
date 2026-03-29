import {
  createContext,
  type PropsWithChildren,
  useMemo,
  useRef,
} from "react";
import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import type { Analytics } from "firebase/analytics";
import type { FirebasePerformance } from "firebase/performance";
import type { RemoteConfig } from "firebase/remote-config";
import type { FirebaseStorage } from "firebase/storage";
import type { Auth } from "firebase/auth";
import type { Database } from "firebase/database";
import type { Firestore } from "firebase/firestore";
import { firebaseService } from "@nardole/firebase-core";
import { useFirebase } from "../hooks/useFirebase.ts";

type FirebaseAppContextValue = {
  app: FirebaseApp;
  analytics?: Analytics;
  performance?: FirebasePerformance;
  remoteConfig?: RemoteConfig;
  storage?: FirebaseStorage;
  auth?: Auth;
  database?: Database;
  firestore?: Firestore;
};

export const FirebaseAppContext = createContext<
  FirebaseAppContextValue | undefined
>(undefined);

type FirebaseAppProviderProps = PropsWithChildren<{
  options: FirebaseOptions;
  name?: string;
  enableAnalytics?: boolean;
  enablePerformance?: boolean;
  enableRemoteConfig?: boolean;
  enableStorage?: boolean;
  enableAuth?: boolean;
  enableDatabase?: boolean;
  enableFirestore?: boolean;
}>;

export function FirebaseAppProvider({
  options,
  name,
  enableAnalytics,
  enablePerformance,
  enableRemoteConfig,
  enableStorage,
  enableAuth,
  enableDatabase,
  enableFirestore,
  children,
}: FirebaseAppProviderProps) {
  const firebase = useFirebase();
  const optionsRef = useRef<FirebaseOptions>(undefined);
  const nameRef = useRef<string>(undefined);

  const value = useMemo(() => {
    if (
      !firebase &&
      (optionsRef.current !== options || nameRef.current !== name)
    ) {
      firebaseService.init(options, name, true);
    }

    optionsRef.current = options;
    nameRef.current = name;

    console.log(firebaseService);

    return {
      app: firebaseService.app,
      analytics: enableAnalytics ? firebaseService.analytics : undefined,
      performance: enablePerformance ? firebaseService.performance : undefined,
      remoteConfig: enableRemoteConfig
        ? firebaseService.remoteConfig
        : undefined,
      storage: enableStorage ? firebaseService.storage : undefined,
      auth: enableAuth ? firebaseService.auth : undefined,
      database: enableDatabase ? firebaseService.database : undefined,
      firestore: enableFirestore ? firebaseService.firestore : undefined,
    };
  }, [options, name]);

  return (
    <FirebaseAppContext.Provider value={value}>
      {children}
    </FirebaseAppContext.Provider>
  );
}
