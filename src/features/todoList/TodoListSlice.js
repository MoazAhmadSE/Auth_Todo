import { createSlice } from "@reduxjs/toolkit";
import { useAddTask } from "../../context/useTasksContext";

const initialState = {
    todo: [],
    completed: [],
};

export const TodoListSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload);
        },
        addComplete: (state, action) => {
            const { index, addTaskCompleted } = action.payload;
            state.todo.splice(index, 1);
            state.completed.push(addTaskCompleted);
        },
        deleteTodo: (state, action) => {
            state.todo.splice(action.payload.index, 1);
        },
        deleteComplete: (state, action) => {
            state.completed.splice(action.payload.index, 1);
        },
        editTodo: (state , action) => {
            const { index } = action.payload;
            state.todo.splice(index, 1);
        },
        setUserTasks: (state, action) => {
            const { todo, completed } = action.payload;
            state.todo = todo;
            state.completed = completed;
        },
    },
});
export const { addTodo, addComplete, deleteTodo, deleteComplete, setUserTasks, editTodo } = TodoListSlice.actions;
export default TodoListSlice.reducer;



