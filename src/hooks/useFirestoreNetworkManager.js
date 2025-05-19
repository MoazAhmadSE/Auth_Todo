import { disableNetwork, enableNetwork } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/FirebaseConfig";


export function useFirestoreNetworkManager(){
    
    useEffect(() => {
        const handleConnectionChange = async () => {
            try{
                if(navigator.onLine){
                    await enableNetwork(db);
                    console.log("You are Online");
                } else {
                    await disableNetwork(db);
                    console.log("You are Offline");
                }
            } catch (error) {
                console.error(error);
            }
        }
        handleConnectionChange();
        window.addEventListener("online", handleConnectionChange);
        window.addEventListener("offline", handleConnectionChange);
        
        return() => {
            window.removeEventListener("online", handleConnectionChange);
            window.removeEventListener("offline", handleConnectionChange);
        }
    }, []);
}