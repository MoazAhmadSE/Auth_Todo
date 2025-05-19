// import { doc, runTransaction } from "firebase/firestore";
// import { db } from "../../../firebase/FirebaseConfig";

// export const useTaskActions = (userId) => {
//   const taskRef = doc(db, "tasks", userId);

//   const updateTasks = async (callbackFunc) => {
//     await runTransaction(db, async (transaction) => {
//       const docSnap = await transaction.get(taskRef);
//       if (!docSnap.exists()) throw Error("Document does not exist");
//       const data = docSnap.data();
//       await callbackFunc(data, transaction);
//     });
//   };

//   const completeTask = async (index, completedTask) =>
//     updateTasks((data, transaction) => {
//       const updatedTodo = data.todo.filter((_, i) => i !== index);
//       const updatedCompleted = [completedTask, ...(data.completed || [])];
//       transaction.update(taskRef, { todo: updatedTodo, completed: updatedCompleted });
//     });

//   const deleteTodo = async (index) =>
//     updateTasks((data, transaction) => {
//       const updatedTodo = data.todo.filter((_, i) => i !== index);
//       transaction.update(taskRef, { todo: updatedTodo });
//     });

//   const deleteCompleted = async (index) =>
//     updateTasks((data, transaction) => {
//       const updatedCompleted = data.completed.filter((_, i) => i !== index);
//       transaction.update(taskRef, { completed: updatedCompleted });
//     });

//   const editTodo = async (index, newTask) =>
//     updateTasks((data, transaction) => {
//       const updatedTodo = data.todo.map((t, i) => (i === index ? newTask : t));
//       transaction.update(taskRef, { todo: updatedTodo });
//     });

//   return { completeTask, deleteTodo, deleteCompleted, editTodo };
// };


import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";

export const useTaskActions = (userId) => {
  const taskRef = doc(db, "tasks", userId);

  const completeTask = async (index, completedTask) => {
    console.log("start");
    const docSnap = await getDoc(taskRef);
    if (!docSnap.exists()) return;
    
    const currentTasks = docSnap.data().todo || [];
    const currentCompletedTasks = docSnap.data().completed || [];
    
    const updatedTodo = currentTasks.filter((_, i) => i !== index);
    const updatedCompleted = [...currentCompletedTasks, completedTask];
    
    await updateDoc(taskRef, {
      todo: updatedTodo,
      completed: updatedCompleted,
    });
    console.log("end");
  };

  const deleteTodo = async (index) => {
    const docSnap = await getDoc(taskRef);
    if (!docSnap.exists()) return;

    const currentTodo = docSnap.data().todo || [];
    const updatedTodo = currentTodo.filter((_, i) => i !== index);

    await updateDoc(taskRef, { todo: updatedTodo });
  };

  const deleteCompleted = async (index) => {
    const docSnap = await getDoc(taskRef);
    if (!docSnap.exists()) return;

    const currentCompletedTasks = docSnap.data().completed || [];
    const updatedCompleted = currentCompletedTasks.filter((_, i) => i !== index);

    await updateDoc(taskRef, { completed: updatedCompleted });
  };

  const editTodo = async (index, newTask) => {
    const docSnap = await getDoc(taskRef);
    if (!docSnap.exists()) return;

    const currentTodo = docSnap.data().todo || [];
    const updatedTodo = currentTodo.map((t, i) => (i === index ? newTask : t));

    await updateDoc(taskRef, { todo: updatedTodo });
  };

  return {
    completeTask,
    deleteTodo,
    deleteCompleted,
    editTodo,
  };
};
