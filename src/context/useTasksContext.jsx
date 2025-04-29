import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ( { children } ) => {
    const [ task, setTask ] = useState("");
    const [ todo, setTodo ] = useState([]);
    const [ completedTask, setCompletedTask ] = useState([]);
    return(
        <TaskContext.Provider value={{ task, setTask, todo, setTodo, completedTask, setCompletedTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useAddTask = () => useContext(TaskContext);