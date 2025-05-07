import { useState, useEffect } from "react";

export const useUserValidation = (uesrName) => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(uesrName)){
            setUserExist(true);
        } else {
            setUserExist(false);
        }
    }, [uesrName])

    return { isEmpty, userExist, setIsEmpty }
}