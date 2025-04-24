export const Button = ({ text, type }) => {
  return (
    <button
        type={type} 
        className="tw-w-full tw-border-2 tw-border-myYellow tw-bg-myYellow tw-text-myDark tw-rounded-2xl tw-py-2 tw-my-2 tw-text-xl hover:tw-scale-105 tw-duration-200">
      {text}
    </button>
  );
};
