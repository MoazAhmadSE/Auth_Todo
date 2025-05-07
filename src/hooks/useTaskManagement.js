import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComplete, deleteComplete, deleteTodo, editTodo } from '../features/todoList/TodoListSlice';
import { toast } from 'react-toastify';

export const useTaskManagement = () => {
  const dispatch = useDispatch();
  const [editTask, setEditTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [isTaskedEdit, setIsTaskEdit] = useState(false);

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo({ index }));
  };

  const handleDeleteComplete = (index) => {
    dispatch(deleteComplete({ index }));
  };

  const handleCompleteTodo = (index, completeTask) => {
    dispatch(addComplete({ index, completeTask }));
  };

  const handleEditTodo = (index, editedTask) => {
    if (editedTask) {
      dispatch(editTodo({ index, editedTask }));
      setIsTaskEdit(false);
      setEditIndex(-1);
      setEditTask("");
    } else {
      toast.error("Edit Task Field should not be Empty.");
    }
  };

  return {
    editTask,
    setEditTask,
    editIndex,
    setEditIndex,
    isTaskedEdit,
    setIsTaskEdit,
    handleDeleteTodo,
    handleDeleteComplete,
    handleCompleteTodo,
    handleEditTodo,
  };
};
