import { injectable } from "inversify";
import { IDatabaseService } from "../../core/database";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

@injectable()
export class FirebaseService implements IDatabaseService {
  private db;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    this.db = getFirestore(app);
  }

  async connect(): Promise<void> {
    // Połączenie jest automatycznie zarządzane przez Firebase
  }

  async disconnect(): Promise<void> {
    // Rozłączenie jest automatycznie zarządzane przez Firebase
  }

  async create<T>(collectionName: string, data: T): Promise<string> {
    const docRef = doc(collection(this.db, collectionName));

    await setDoc(docRef, data);
    return docRef.id;
  }

  async read<T>(collectionName: string, id: string): Promise<T | null> {
    const docRef = doc(this.db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  }

  async update<T>(
    collectionName: string,
    id: string,
    data: Partial<T>
  ): Promise<void> {
    const docRef = doc(this.db, collectionName, id);
    await updateDoc(docRef, data as any);
  }

  async delete(collectionName: string, id: string): Promise<void> {
    const docRef = doc(this.db, collectionName, id);
    await deleteDoc(docRef);
  }
}
