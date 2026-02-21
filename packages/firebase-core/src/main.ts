import {
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app";
import { type Analytics, getAnalytics } from "firebase/analytics";
import { type FirebasePerformance, getPerformance } from "firebase/performance";
import { type FirebaseStorage, getStorage } from "firebase/storage";
import { type RemoteConfig, getRemoteConfig } from "firebase/remote-config";
import { type Auth, getAuth } from "firebase/auth";
import { type Database, getDatabase } from "firebase/database";
import { type Firestore, getFirestore } from "firebase/firestore";

export class FirebaseAppCore {
  static instance: FirebaseAppCore;
  private _app: FirebaseApp | undefined;
  private _analytics: Analytics | undefined;
  private _performance: FirebasePerformance | undefined;
  private _remoteConfig: RemoteConfig | undefined;
  private _storage: FirebaseStorage | undefined;
  private _auth: Auth | undefined;
  private _database: Database | undefined;
  private _firestore: Firestore | undefined;

  constructor() {
    if (!FirebaseAppCore.instance) {
      FirebaseAppCore.instance = this;
    }
    return FirebaseAppCore.instance;
  }

  init(options: FirebaseOptions, name?: string, override?: boolean) {
    if (!this._app || override) {
      this._app = initializeApp(options, name);
      return;
    }
    throw new Error("Firebase app already initialized");
  }

  get app() {
    if (!this._app) {
      throw new Error("Firebase app not initialized");
    }
    return this._app;
  }
  get analytics() {
    if (!this._analytics) {
      this._analytics = getAnalytics(this.app);
    }
    return this._analytics;
  }
  get performance() {
    if (!this._performance) {
      this._performance = getPerformance(this.app);
    }
    return this._performance;
  }
  get remoteConfig() {
    if (!this._remoteConfig) {
      this._remoteConfig = getRemoteConfig(this.app);
    }
    return this._remoteConfig;
  }
  get storage() {
    if (!this._storage) {
      this._storage = getStorage(this.app);
    }
    return this._storage;
  }
  get auth() {
    if (!this._auth) {
      this._auth = getAuth(this.app);
    }
    return this._auth;
  }
  get database() {
    if (!this._database) {
      this._database = getDatabase(this.app);
    }
    return this._database;
  }
  get firestore() {
    if (!this._firestore) {
      this._firestore = getFirestore(this.app);
    }
    return this._firestore;
  }
}

const firebaseService = new FirebaseAppCore();

export { firebaseService };
