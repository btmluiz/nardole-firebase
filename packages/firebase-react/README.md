# @nardole/firebase-react

Elegant React bindings for @nardole/firebase-core. Provide the Firebase App via Context and access it anywhere with hooks. Works great in Micro‑Frontends thanks to the shared singleton under the hood.

[![npm version](https://img.shields.io/npm/v/%40nardole%2Ffirebase-react.svg?logo=npm)](https://www.npmjs.com/package/@nardole/firebase-react)
![types](https://img.shields.io/badge/types-TypeScript-blue?logo=typescript)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](#license)
[![react](https://img.shields.io/badge/react-%3E%3D17-61dafb?logo=react&logoColor=white)](https://react.dev/)

- Why
- Features
- Installation
- Quick Start
- Usage
  - Provider
  - Hook
- Micro‑Frontend (MFE)
- API
- Compatibility
- Troubleshooting
- License

## Why
Managing Firebase initialization across multiple React apps or MFEs is error‑prone. This package provides a tiny Provider and Hook built on a shared singleton, ensuring exactly one Firebase instance.

## Features
- FirebaseAppProvider to initialize and provide the app via React Context
- useFirebaseApp hook to access the current FirebaseApp instance
- Designed for MFEs — initialize once (even outside React) and reuse everywhere

## Installation
- pnpm add @nardole/firebase-react @nardole/firebase-core firebase react react-dom
- npm install @nardole/firebase-react @nardole/firebase-core firebase react react-dom
- yarn add @nardole/firebase-react @nardole/firebase-core firebase react react-dom

## Quick Start
1. Wrap your application with the Provider using your Firebase options.
2. Use the Hook in child components to access the shared instance.

## Usage — Provider
```tsx
import { FirebaseAppProvider } from '@nardole/firebase-react';

export function AppRoot() {
  return (
    <FirebaseAppProvider
      options={{
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_AUTH_DOMAIN',
        projectId: 'YOUR_PROJECT_ID',
        appId: 'YOUR_APP_ID',
      }}
    >
      <YourApp />
    </FirebaseAppProvider>
  );
}
```

## Usage — Hook
```tsx
import { useFirebaseApp } from '@nardole/firebase-react';

export function AnyComponent() {
  const app = useFirebaseApp();
  // Use app with other firebase packages (auth, firestore, etc.)
  return null;
}
```

## Micro‑Frontend (MFE)
Initialize the core service in the shell or any federated module, and React MFEs will reuse it.
```ts
// shell or any non-React mfe
import { firebaseService } from '@nardole/firebase-core';
firebaseService.init({ /* options */ });
```
```tsx
// inside a React MFE
import { FirebaseAppProvider, useFirebaseApp } from '@nardole/firebase-react';

// Option A — wrap with the provider (reuses existing instance)
<FirebaseAppProvider options={{ /* same options */ }}>
  <YourApp />
</FirebaseAppProvider>

// Option B — if the provider isn’t available, you can still use the hook
const app = useFirebaseApp();
```

## API

| Item | Props/Signature | Description | Notes/Errors |
| --- | --- | --- | --- |
| FirebaseAppProvider | <FirebaseAppProvider options: FirebaseOptions, name?: string, enableAnalytics?: boolean, enablePerformance?: boolean, enableRemoteConfig?: boolean, enableStorage?: boolean, enableAuth?: boolean, enableDatabase?: boolean, enableFirestore?: boolean> | React Provider that initializes and provides Firebase App via Context. It can also pre-instantiate and expose optional Firebase services via Context. | Internally calls firebaseService.init(options, name, true) when options/name change. Optional services are only available in Context if their respective enable flags are true. |
| useFirebaseApp | useFirebaseApp(): FirebaseApp | Hook to get the current FirebaseApp from Context. | Throws if used outside a FirebaseAppProvider: "Firebase app isn't found, did you forget to wrap your app in <FirebaseAppProvider>" |
| useAnalytics | useAnalytics(): Analytics | Hook to access Analytics from Context. | Throws if Provider not present or enableAnalytics not set. |
| usePerformance | usePerformance(): FirebasePerformance | Hook to access Performance from Context. | Throws if Provider not present or enablePerformance not set. |
| useRemoteConfig | useRemoteConfig(): RemoteConfig | Hook to access Remote Config from Context. | Throws if Provider not present or enableRemoteConfig not set. |
| useStorage | useStorage(): FirebaseStorage | Hook to access Storage from Context. | Throws if Provider not present or enableStorage not set. |
| useAuth | useAuth(): Auth | Hook to access Auth from Context. | Throws if Provider not present or enableAuth not set. |
| useDatabase | useDatabase(): Database | Hook to access Realtime Database from Context. | Throws if Provider not present or enableDatabase not set. |
| useFirestore | useFirestore(): Firestore | Hook to access Firestore from Context. | Throws if Provider not present or enableFirestore not set. |

## Compatibility
- Peer: react >=17, react-dom >=17, firebase ^12, @nardole/firebase-core ^1

## Troubleshooting
- Seeing "Firebase app already initialized" warnings/errors?
  - Ensure your MFEs share the same options and app name, or rely on the @nardole/firebase-core singleton. The Provider uses `override` to safely update when props change.

## License
MIT
