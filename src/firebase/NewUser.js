import { doc, writeBatch } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export async function newUser({ userId }) {
    const batch = writeBatch(db);
    try {
        const userDoc = doc(db, 'users', userId);
        batch.set(userDoc, { isOnline: false });

        const taskDoc = doc(db, 'tasks', userId);
        batch.set(taskDoc, { todo: [], completed: [] });
        await batch.commit();
        console.log("User and tasks initialized successfully.");
    } catch (error) {
        console.error("Error creating user or tasks:", error);
    }
}
