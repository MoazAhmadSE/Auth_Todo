import { List } from "../components/List";
import { Navbar } from "../components/Navbar";

export default function Home() {
    return(
        <div className="tw-bg-myDark tw-min-h-screen">
            <Navbar/>
            <List />
        </div>
    )
}