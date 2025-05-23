import { useEmailVerification } from "../hooks/useEmailVerification";
import Loading from "../components/Loading";

export default function VerifyEmail() {
  const { checking, resendVerification, loading } = useEmailVerification();

  return (
    <div className="tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-text-white">
      {loading && (
        <>
          <h2 className="tw-text-2xl">Please wait verifying...</h2>
          <Loading />
        </>
      )}
      <h2 className="tw-text-2xl">Please verify your email address</h2>
      <p className="tw-my-4">
        Check your inbox and click the verification link.
      </p>
      <button
        onClick={resendVerification}
        disabled={checking || loading}
        className="tw-bg-myYellow tw-text-myDark tw-font-bold tw-px-6 tw-py-2 tw-rounded-lg"
      >
        {checking ? "Resending..." : "Resend Email"}
      </button>
    </div>
  );
}
