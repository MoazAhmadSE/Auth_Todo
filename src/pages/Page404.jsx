import { Title } from "../components/Title"
import { Link } from "react-router-dom"

export const Page404 = () => {
    return(
        <div className="tw-bg-myDark tw-min-h-screen tw-flex tw-justify-center tw-items-center tw-flex-col">
            <Title title={"ERROR 404"} className={"tw-text-myYellow tw-text-4xl tw-font-bold"} />
            <Title title={"Page not found"} className={"tw-text-myYellow tw-text-2xl"} />
            <Link to={"/login"} className="tw-text-white tw-underline tw-m-2 hover:tw-scale-110 hover:tw-text-myYellow tw-duration-150" >Go to Login</Link>
        </div>
    )
}