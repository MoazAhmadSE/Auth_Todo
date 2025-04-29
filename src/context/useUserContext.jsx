import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ userName, setUserName ] = useState("");
    const [ userPassword, setUserPassword ] = useState("");
    const [ confirmUserPassword, setConfirmUserPassword ] = useState("");
    return(
        <UserContext.Provider value={ { userName, setUserName, userPassword, setUserPassword, confirmUserPassword, setConfirmUserPassword } } >
            {children}
        </UserContext.Provider>
    )
}

export const useUserInfo = () => useContext(UserContext);