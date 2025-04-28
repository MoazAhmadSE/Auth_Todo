import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from '../features/todoList/TodoListSlice'


export default configureStore({
    reducer: {
        todoList : todoListReducer,
    },
})