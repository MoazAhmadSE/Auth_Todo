import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ( { children } ) => {
    const [ task, settask ] = useState("");
    const [ todo, setTodo ] = useState([]);
    const [ completedTask, setCompletedTasks ] = useState([]);
    return(
        <TaskContext.Provider value={{ task, settask, todo, setTodo, completedTask, setCompletedTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useAddTask = () => useContext(TaskContext);