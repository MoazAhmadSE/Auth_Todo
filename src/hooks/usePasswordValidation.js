import { useState } from "react";


export const usePasswordValidation = () => {
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
    const [passwordDidMAtch, setPasswordDidMatch] = useState(true);

    const validate = (password, confirmPassword) => {
        let isValid = true;

        if (password === "") {
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
        } else if(password === confirmPassword){
            setPasswordDidMatch(true);
            isValid = true;
        }

        return isValid;
    };

    return {
        isPasswordEmpty,
        validPassword,
        isConfirmPasswordEmpty,
        passwordDidMAtch,
        setIsPasswordEmpty,
        setValidPassword,
        setIsConfirmPasswordEmpty,
        setPasswordDidMatch,
        validate,
    };
};