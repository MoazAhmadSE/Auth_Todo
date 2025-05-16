import { useState } from "react";
import { db } from "../../firebase/FirebaseConfig";
import { doc, runTransaction } from "firebase/firestore";

export default function useAddTask(userId) {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    if (!task) return;

    setLoading(true);
    const userTaskDoc = doc(db, "tasks", userId);

    try {
      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(userTaskDoc);
        if (!taskDoc.exists()) {
          throw Error("Document does not exist");
        }
        const currentTasks = taskDoc.data().todo || [];
        currentTasks.push(task);
        // currentTasks.unshift(task);
        transaction.update(userTaskDoc, { todo: currentTasks });
      });
      console.log("Task added successfully!");
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setLoading(false);
  };

  return {
    task,
    loading,
    setTask,
    addTask,
  };
}