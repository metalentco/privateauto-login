import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Loading from "@/components/Loading";

import { forgotPassword } from "@/libs/cognito";

enum Action { OPEN, CLOSE, FORGOT, FAIL };

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isBtnEnabled, setIsBtnEnabled] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [action, setAction] = useState<Action>(Action.OPEN);
  const [lastError, setLastError] = useState<string>('');

  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  useEffect(() => {
    if (action === Action.FORGOT) {
      window?.parent && window.parent.postMessage(
        { formSubmitted: true, formName: "forgot" },
        "*"
      );
    } else if (action === Action.FAIL && window) {
      window?.parent && window.parent.postMessage(
        {
          formSubmitted: false,
          formName: "forgot",
          error: lastError,
        },
        "*"
      );
    } else if (action === Action.CLOSE && window) {
      window.close();
    }
  }, [action, lastError]);



  const resetPassword = async () => {
    try {
      setIsLoading(true);
      await forgotPassword(window, email);
      setAction(Action.FORGOT);
      setIsLoading(false);
      router.push("/code");
    } catch (err) {
      if (err instanceof Error) {
        setLastError(err.message);
        setAction(Action.FAIL);
        setIsLoading(false);
        console.log(err.message);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      resetPassword();
    }
  };

  function closeApp() {
    setAction(Action.CLOSE);
  }

  return (
    <div className="w-full bg-[#fff]">
      <div className="w-full flex justify-center py-8">
        <div className={`w-4/5 sm:w-[60%] ${isLoading && "opacity-40"}`}>
          <div className="text-[2rem] text-[#212529] font-bold">
            Forgot Password?
          </div>
          <div className="text-base font-medium pt-2">
            Back to{" "}
            <Link href="/">
              <span className="text-[#00b3de] underline">Sign in</span>
            </Link>
          </div>
          <div className="text-base text-[#212529] font-medium py-2">
            Enter your email below to reset your password
          </div>
          <div className="py-2">
            <input
              type="text"
              className="border-[#9797aa] focus:border-[#00a0c7] form-control w-full block px-4 py-2 text-base font-medium bg-white bg-clip-padding border border-solid  rounded m-0"
              placeholder="Email address"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
                if (regex.test(e.target.value) && e.target.value != "") {
                  setIsBtnEnabled(true);
                } else {
                  setIsBtnEnabled(false);
                }
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="py-2">
            <button
              className={`w-full bg-[#17a2b8] text-white text-base font-bold py-2 px-4 border-[#117a8b] rounded ${isBtnEnabled ? "opacity-100" : "opacity-50"
                }`}
              onClick={() => resetPassword()}
              disabled={!isBtnEnabled}
            >
              Reset Password
            </button>
          </div>
          <hr className="text-[#c4c4c4] my-2" />
          <div className="text-sm text-[#6c757d] py-4 px-4">
            *check your email for your password reset code
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default Forgot;
