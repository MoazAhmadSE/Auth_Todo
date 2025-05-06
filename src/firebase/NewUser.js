import { db } from "./FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function NewUser({ username, userpassword }) {
    try {
        const userDoc = doc(db, 'users', username);
        await setDoc(userDoc, {
            username,
            userpassword: userpassword,
            isOnline: false,
        });

        const taskDoc = doc(db, 'tasks', username);
        await setDoc(taskDoc, {
            todo: [],
            completed: []
        });
        console.log("User and tasks initialized successfully.");
    } catch (error) {
        console.error("Error creating user or tasks:", error);
    }
}