import { doc, setDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export async function newUser({ userId }) {
    try {
        const userDoc = doc(db, 'users', userId); 
        await setDoc(userDoc, {
            isOnline: false,
        });

        const taskDoc = doc(db, 'tasks', userId);
        await setDoc(taskDoc, {
            todo: [],
            completed: []
        });
        console.log("User and tasks initialized successfully.");
    } catch (error) {
        console.error("Error creating user or tasks:", error);
    }
}
