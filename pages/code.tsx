import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import StrongPassword from "@/components/StrongPassword";
import Loading from "@/components/Loading";
import {
  checkCharacterNumber,
  checkSpecialCharacter,
  checkUpperLower,
  checkNumber,
  checkEmail,
} from "@/libs/utils";

import { ResetPassword } from "@/libs/cognito";

const basePath = process.env.BASEPATH || '';

enum Action { OPEN, CLOSE, RESET, FAIL };


const Code = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [action, setAction] = useState<Action>(Action.OPEN);
  const [lastError, setLastError] = useState<string>('');


  useEffect(() => {
    if (action === Action.RESET) {
      window?.parent && window.parent.postMessage(
        { formSubmitted: true, formName: "resetPassword" },
        "*"
      );
    } else if (action === Action.FAIL && window) {
      window?.parent && window.parent.postMessage(
        {
          formSubmitted: false,
          formName: "resetPassword",
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
      await ResetPassword(email, password, code);
      setAction(Action.RESET);
      setIsLoading(false);
      router.push("/");
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
            Reset password
          </div>
          <div className="text-base font-medium pt-2">
            Back to{" "}
            <Link href="/">
              <span className="text-[#00b3de] underline">Sign in</span>
            </Link>
          </div>
          <div className="pt-2">
            <p className="text-base text-[#212529] font-medium py-2">
              Verification code
            </p>
            <input
              type="text"
              className="border-[#9797aa] focus:border-[#00a0c7] form-control w-full block px-4 py-2 text-base font-medium bg-white bg-clip-padding border border-solid  rounded m-0"
              value={code}
              onChange={(e: any) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="relative">
            <p className="text-base text-[#212529] font-medium py-2">
              New Password
            </p>
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="bg-no-repeat bg-[center_right_0.5rem] border-[#9797aa] focus:border-[#00a0c7] form-control w-full block px-4 py-2 text-base font-medium bg-white bg-clip-padding border border-solid  rounded m-0"
              placeholder="Password"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <StrongPassword password={password} />
            {showPassword ? (
              <Image
                className="absolute top-14 right-2"
                width={17}
                height={15}
                src={`${basePath}/assets/eyeCrossedOut.svg`}
                alt="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Image
                className="absolute top-14 right-2"
                width={15}
                height={11}
                src={`${basePath}/assets/eye.svg`}
                alt="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div>
            <p className="text-base text-[#212529] font-medium py-2">Email</p>
            <input
              type="text"
              className="border-[#9797aa] focus:border-[#00a0c7] form-control w-full block px-4 py-2 text-base font-medium bg-white bg-clip-padding border border-solid  rounded m-0"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="py-6">
            <button
              className={`w-full bg-[#17a2b8] text-white text-base font-bold py-2 px-4 border-[#117a8b] rounded ${email != "" &&
                checkEmail(email) &&
                code != "" &&
                password != "" &&
                checkCharacterNumber(password) &&
                checkSpecialCharacter(password) &&
                checkUpperLower(password) &&
                checkNumber(password)
                ? "opacity-100"
                : "opacity-50"
                }`}
              onClick={() => resetPassword()}
              disabled={
                !(
                  email != "" &&
                  checkEmail(email) &&
                  code != "" &&
                  password != "" &&
                  checkCharacterNumber(password) &&
                  checkSpecialCharacter(password) &&
                  checkUpperLower(password) &&
                  checkNumber(password)
                )
              }
            >
              Reset Password
            </button>
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default Code;
