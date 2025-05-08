import { useState, useEffect } from "react";


export const usePasswordValidation = ( userName ) => {
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
    const [passwordDidMAtch, setPasswordDidMatch] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(userName)) {
            setUserExist(true);
        } else {
            setUserExist(false);
        }
    }, [userName])

    const validate = (password, confirmPassword) => {
        let isValid = true;

        if (userName === "") {
            setIsEmpty(true);
            isValid = false;
        } else if (userExist){
            isValid = false;
        } else if (password === "") {
            setIsPasswordEmpty(true);
            isValid = false;
        } else if (password.length < 6) {
            setValidPassword(false);
            isValid = false;
        } else if (confirmPassword === "") {
            setIsConfirmPasswordEmpty(true);
            isValid = false;
        } else if (password !== confirmPassword) {
            setPasswordDidMatch(false);
            isValid = false;
        } else if (password === confirmPassword) {
            setPasswordDidMatch(true);
            isValid = true;
        }

        return isValid;
    };

    return {
        isEmpty,
        userExist,
        isPasswordEmpty,
        validPassword,
        isConfirmPasswordEmpty,
        passwordDidMAtch,
        setIsEmpty,
        setIsPasswordEmpty,
        setValidPassword,
        setIsConfirmPasswordEmpty,
        setPasswordDidMatch,
        validate,
    };
};