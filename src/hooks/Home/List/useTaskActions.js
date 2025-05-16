import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";

export const useTaskActions = (userId) => {
  const taskRef = doc(db, "tasks", userId);

  const updateTasks = async (callbackFunc) => {
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(taskRef);
      if (!docSnap.exists()) throw Error("Document does not exist");
      const data = docSnap.data();
      await callbackFunc(data, transaction);
    });
  };

  const completeTask = async (index, completedTask) =>
    updateTasks((data, transaction) => {
      const updatedTodo = data.todo.filter((_, i) => i !== index);
      const updatedCompleted = [completedTask, ...(data.completed || [])];
      transaction.update(taskRef, { todo: updatedTodo, completed: updatedCompleted });
    });

  const deleteTodo = async (index) =>
    updateTasks((data, transaction) => {
      const updatedTodo = data.todo.filter((_, i) => i !== index);
      transaction.update(taskRef, { todo: updatedTodo });
    });

  const deleteCompleted = async (index) =>
    updateTasks((data, transaction) => {
      const updatedCompleted = data.completed.filter((_, i) => i !== index);
      transaction.update(taskRef, { completed: updatedCompleted });
    });

  const editTodo = async (index, newTask) =>
    updateTasks((data, transaction) => {
      const updatedTodo = data.todo.map((t, i) => (i === index ? newTask : t));
      transaction.update(taskRef, { todo: updatedTodo });
    });

  return { completeTask, deleteTodo, deleteCompleted, editTodo };
};
