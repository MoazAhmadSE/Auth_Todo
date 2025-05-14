import { useState } from "react";

export const useEditTaskState = () => {
  const [editTask, setEditTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  const startEdit = (task, index) => {
    setEditTask(task);
    setEditIndex(index);
    setIsEditing(true);
  };

  const resetEdit = () => {
    setEditTask("");
    setEditIndex(-1);
    setIsEditing(false);
  };

  return {
    editTask,
    setEditTask,
    editIndex,
    isEditing,
    startEdit,
    resetEdit,
  };
};
