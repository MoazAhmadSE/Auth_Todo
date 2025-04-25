import { useNavigate } from "react-router-dom";
import { AddTasks } from "../components/AddTasks";
import { List } from "../components/List";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const name = sessionStorage.getItem("username");
        if(!name){
            navigate('/');
        }
    })
    return(
        <div className="tw-bg-myDark tw-min-h-screen">
            <Navbar/>
            <AddTasks />
            <List />
        </div>
    )
}