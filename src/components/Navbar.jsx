import { Logout } from "./Logout";
import { Title } from "./Title";
import { Delete } from "./Delete";

export const Navbar = ({ userName }) => {
  return (
    <div>
      <div className="sm:tw-block md:tw-hidden lg:tw-hidden">
        <div className="tw-min-w-full tw-flex tw-flex-col tw-bg-slate-900 tw-py-3 tw-items-center tw-justify-between tw-px-4">
          <Title
            className="tw-text-myYellow tw-text-4xl tw-font-bold"
            title="Todo List"
          />
          <h3 className="tw-text-myYellow tw-flex tw-items-center tw-gap-2 tw-font-bold tw-pt-3">
            Username:&nbsp;{userName.toUpperCase()}
            {/* <Logout />
            <Delete /> */}
          </h3>
        </div>
      </div>

      <div className="sm:tw-hidden md:tw-block">
        <div className="tw-min-w-full tw-flex tw-bg-slate-900 tw-py-3 tw-items-center tw-justify-between tw-px-4 tw-border-b-2 tw-border-myYellow">
          <Title
            className="tw-text-myYellow tw-text-4xl tw-font-bold"
            title="Todo List"
          />
          <h3 className="tw-text-myYellow tw-flex tw-items-center tw-gap-2 tw-font-bold">
            Username:&nbsp;{userName.toUpperCase()}
            {/* <Logout />
            <Delete /> */}
          </h3>
        </div>
      </div>
    </div>
  );
};
