import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";

export const useTaskData = (userId) => {
  const [todo, setTodo] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "tasks", userId), { includeMetadataChanges: true } , (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTodo(data.todo || []);
        setCompleted(data.completed || []);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [userId]);

  return { todo, completed, loading };
};
