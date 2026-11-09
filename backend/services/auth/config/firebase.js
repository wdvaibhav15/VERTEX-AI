import { cert, initializeApp } from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" with {type :"json"};

// initialize the app
export const app = initializeApp({
    credential: cert(serviceAccount),
});