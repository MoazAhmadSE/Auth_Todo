// import { useState } from "react";
// import { db } from "../../firebase/FirebaseConfig";
// import { doc, runTransaction } from "firebase/firestore";

// export default function useAddTask(userId) {
//   const [task, setTask] = useState("");
//   const [loading, setLoading] = useState(false);

//   const addTask = async () => {
//     if (!task) return;

//     setLoading(true);
//     const userTaskDoc = doc(db, "tasks", userId);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const taskDoc = await transaction.get(userTaskDoc);
//         if (!taskDoc.exists()) {
//           throw Error("Document does not exist");
//         }
//         const currentTasks = taskDoc.data().todo || [];
//         currentTasks.push(task);
//         // currentTasks.unshift(task);
//         transaction.update(userTaskDoc, { todo: currentTasks });
//       });
//       console.log("Task added successfully!");
//       setTask("");
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }

//     setLoading(false);
//   };

//   return {
//     task,
//     loading,
//     setTask,
//     addTask,
//   };
// }


import { useState } from "react";
import { db } from "../../firebase/FirebaseConfig";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

export default function useAddTask(userId) {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmpty, setisEmpty] = useState(false);

  const addTask = async () => {
    if (task === ""){
      setisEmpty(true);
      return;
    }
    if(navigator.onLine){
      setLoading(true);
    }
    const userTaskDoc = doc(db, "tasks", userId);
    
    try {
      const docSnap = await getDoc(userTaskDoc);
      if (!docSnap.exists()) {
        await setDoc(userTaskDoc, { todo: [task] });
      } else {
        const currentTasks = docSnap.data().todo || [];
        const updatedTasks = [...currentTasks, task];
        setTask("");
        await updateDoc(userTaskDoc, { todo: updatedTasks });
      }
      console.log("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setLoading(false);
  };

  return {
    task,
    loading,
    isEmpty,
    setTask,
    addTask,
    setisEmpty
  };
}
