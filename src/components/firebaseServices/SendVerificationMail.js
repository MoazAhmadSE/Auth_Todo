import { sendEmailVerification } from "firebase/auth";


export const SendVerificationMail = async (user) => {
    const actionCodeSettings = {
        url: `http://localhost:5173/VerifyEmail`,
        handleCodeInApp: true,
    };
    await sendEmailVerification(user, actionCodeSettings);
}