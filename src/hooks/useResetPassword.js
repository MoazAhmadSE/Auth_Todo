import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";

export const useResetPassword = () => {
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const resetPassword = async (email, newPassword) => {
        try {
            // Update the password in Firebase or use the password reset flow
            // Since Firebase directly handles password reset email flow, we'll assume a reset email for now
            const actionCodeSettings = {
                url: 'http://localhost:5173/reset-password',
                handleCodeInApp: true,
            };
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setIsSuccess(true);
            setError(null);
        } catch (error) {
            setError(error.message);
            setIsSuccess(false);
        }
    };

    return { resetPassword, error, isSuccess };
};
