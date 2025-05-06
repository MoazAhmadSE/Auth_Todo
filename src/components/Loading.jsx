import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center">
      <DotLottieReact
        className="tw-h-[20dvw]  "
        src="https://lottie.host/7387c656-9453-49c8-bde5-d8b6c83ad1f7/UKh0GFE7A9.lottie"
        loop
        autoplay
      />
    </div>
  );
}
