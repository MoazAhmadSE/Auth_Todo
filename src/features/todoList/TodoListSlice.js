import { createSlice } from "@reduxjs/toolkit";

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
            const { index, completeTask } = action.payload;
            console.log(index, completeTask);
            state.todo = state.todo.filter((_, i) => i !== index );
            state.completed.push(completeTask);
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter((_, i) => i !== action.payload.index);
        },
        deleteComplete: (state, action) => {
            state.completed = state.completed.filter((_, i) => i !== action.payload.index);
        },
        editTodo: (state , action) => {
            const { index, editedTask } = action.payload;
            state.todo = state.todo.map( (todo, i) =>
                i === index ? editedTask : todo 
            )
            // state.todo = state.todo.filter((_, i) => i !== action.payload.index);
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



