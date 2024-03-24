import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import firebaseConfig from "@/data/firebase/key";

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const database = getDatabase(app);
