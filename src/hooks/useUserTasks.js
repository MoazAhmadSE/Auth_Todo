import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserTasks } from '../features/todoList/TodoListSlice';

export const useUserTasks = () => {
  const dispatch = useDispatch();
  console.log("sandlansldas");
  useEffect(() => {
    const user = sessionStorage?.getItem("username");
    const storedUser = JSON.parse(localStorage?.getItem(user));
    if (storedUser?.isOnline === false) {
      storedUser.isOnline = true;
      localStorage.setItem(user, JSON.stringify(storedUser));

      const userdata = JSON.parse(localStorage?.getItem(user));
      if (userdata) {
        dispatch(
          setUserTasks({
            todo: userdata.todoList.todo,
            completed: userdata.todoList.completed,
          })
        );
      }
    }
  }, []);
};
