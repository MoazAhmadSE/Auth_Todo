import { Title } from "./Title";

export const Navbar = () => {
  return (
    <div>
      <div className="tw-flex tw-justify-evenly tw-items-center tw-bg-slate-600 tw-py-3 tw-w-full  tw-absolute">
        <Title title={"Todo List"} />
      </div>
      <h3 className="tw-text-myYellow tw-w-full tw-flex tw-justify-end tw-p-5 tw-relative tw-font-bold">
        Username:&nbsp;
        {sessionStorage.getItem("username").toUpperCase()}
      </h3>
    </div>
  );
};
