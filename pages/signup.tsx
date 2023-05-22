import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StrongPassword from "@/components/StrongPassword";
import Loading from "@/components/Loading";
import {
  checkCharacterNumber,
  checkSpecialCharacter,
  checkUpperLower,
  checkNumber,
  checkEmail,
} from "@/libs/utils";

import { signUp } from "@/libs/cognito";

const basePath = process.env.BASEPATH || '';


const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<Boolean>(false);
  const [isFirstnameError, setIsFirstnameError] = useState<Boolean>(false);
  const [isLastnameError, setIsLastnameError] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const create = async () => {
    setIsEmailError(email == "" || !checkEmail(email));
    setIsFirstnameError(firstname == "");
    setIsLastnameError(lastname == "");
    if (
      email != "" &&
      checkEmail(email) &&
      firstname != "" &&
      lastname != "" &&
      checkCharacterNumber(password) &&
      checkSpecialCharacter(password) &&
      checkUpperLower(password) &&
      checkNumber(password)
    ) {
      try {
        setIsLoading(true);
        await signUp(email, password);
        window.parent.postMessage(
          { formSubmitted: true, formName: "signup" },
          "*"
        );
        setIsLoading(false);
      } catch (err: any) {
        window.parent.postMessage(
          { formSubmitted: false, formName: "signup", error: err.message },
          "*"
        );
        setIsLoading(false);
        console.log(err.message);
      }
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      create();
    }
  };

  return (
    <div className="w-full bg-[#fff]">
      <Header />
      <div className="w-full flex justify-center py-8">
        <div className={`w-4/5 sm:w-[60%] ${isLoading && "opacity-40"}`}>
          <div className="text-[2rem] text-[#212529] font-bold">
            Create an account
          </div>
          <div className="text-base text-[#212529] font-medium py-2">
            Already have an account?&nbsp;
            <Link href="/">
              <span className="text-[#00b3de] underline">Sign in</span>
            </Link>
          </div>
          <div className="py-2">
            <input
              type="text"
              className="border-[#9797aa] focus:border-[#00a0c7] form-control w-full block px-4 py-2 text-base font-medium bg-white bg-clip-padding border border-solid  rounded m-0"
              placeholder="Email address"
              value={email}
              onChange={(e: any) => {
                if (checkEmail(e.target.value)) {
                  setIsEmailError(false);
                } else {
                  setIsEmailError(true);
                }
                setEmail(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            {isEmailError ? (
              email != "" ? (
                <div className="text-xs text-left text-[#ed0a0a] pt-2">
                  Email is not correct.
                </div>
              ) : (
                <div className="text-xs text-left text-[#ed0a0a] pt-2">
                  Email is required.
                </div>
              )
            ) : (
              ""
            )}
          </div>
          <div className="py-2">
            <input
              type="text"
              className="border-[#9797aa] focus:border-[#00a0c7] form-control w-full block px-4 py-2 text-base font-medium bg-white bg-clip-padding border border-solid  rounded m-0"
              placeholder="First name"
              value={firstname}
              onChange={(e: any) => {
                if (e.target.value != "") {
                  setIsFirstnameError(false);
                } else {
                  setIsFirstnameError(true);
                }
                setFirstname(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            {isFirstnameError && (
              <div className="text-xs text-left text-[#ed0a0a] pt-2">
                Firstname is required.
              </div>
            )}
          </div>
          <div className="py-2">
            <input
              type="text"
              className="border-[#9797aa] focus:border-[#00a0c7] form-control w-full block px-4 py-2 text-base font-medium bg-white bg-clip-padding border border-solid  rounded m-0"
              placeholder="Last name"
              value={lastname}
              onChange={(e: any) => {
                if (e.target.value != "") {
                  setIsLastnameError(false);
                } else {
                  setIsLastnameError(true);
                }
                setLastname(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            {isLastnameError && (
              <div className="text-xs text-left text-[#ed0a0a] pt-2">
                Lastname is required.
              </div>
            )}
          </div>
          <div className="relative py-2">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="border-[#9797aa] focus:border-[#00a0c7] form-control w-full block px-4 py-2 text-base font-medium bg-white bg-clip-padding border border-solid  rounded m-0"
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
                className="absolute top-5 right-2"
                width={17}
                height={15}
                src={`${basePath}/assets/eyeCrossedOut.svg`}
                alt="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Image
                className="absolute top-6 right-2"
                width={15}
                height={11}
                src={`${basePath}/assets/eye.svg`}
                alt="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className="py-2">
            <button
              className="w-full bg-[#00b3de] hover:opacity-80 text-[#fff] text-base font-bold py-3 px-4 border border-[#00a0c7] rounded cursor-pointer"
              onClick={() => create()}
            >
              Create account
            </button>
          </div>
          <hr className="text-[#c4c4c4] my-2" />
          <Footer />
        </div>
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default Signup;
