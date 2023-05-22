import Image from "next/image";
import {
  checkCharacterNumber,
  checkSpecialCharacter,
  checkUpperLower,
  checkNumber,
  checkEmail,
} from "@/libs/utils";

const basePath = process.env.BASEPATH || '';

type Props = {
  password: string;
};

const StrongPassword = ({ password }: Props) => {
  return (
    <div className="w-full">
      {checkCharacterNumber(password) &&
      checkSpecialCharacter(password) &&
      checkUpperLower(password) &&
      checkNumber(password) ? (
        <div className="w-full bg-[#dff3e7] flex items-center space-x-2 px-4 mt-8 rounded">
          <Image
            width={16}
            height={16}
            src={`${basePath}/assets/strong-password.svg`}
            alt="valid"
          />
          <p className="text-base text-[#212529] font-medium py-2">
            Your password is strong!
          </p>
        </div>
      ) : (
        password != "" && (
          <div className="w-full space-y-2 pt-4">
            <div className="flex space-x-1 text-sm">
              {checkCharacterNumber(password) ? (
                <Image
                  width={16}
                  height={16}
                  src={`${basePath}/assets/valid.svg`}
                  alt="valid"
                />
              ) : (
                <Image
                  width={16}
                  height={16}
                  src={`${basePath}/assets/not-valid.svg`}
                  alt="not-valid"
                />
              )}
              <p
                className={`${
                  checkCharacterNumber(password)
                    ? "text-[#808080]"
                    : "text-[#212529]"
                }`}
              >
                8 characters minimum in length
              </p>
            </div>
            <div className="flex space-x-1 text-sm">
              {checkSpecialCharacter(password) ? (
                <Image
                  width={16}
                  height={16}
                  src={`${basePath}/assets/valid.svg`}
                  alt="valid"
                />
              ) : (
                <Image
                  width={16}
                  height={16}
                  src={`${basePath}/assets/not-valid.svg`}
                  alt="not-valid"
                />
              )}
              <p
                className={`${
                  checkSpecialCharacter(password)
                    ? "text-[#808080]"
                    : "text-[#212529]"
                }`}
              >
                One special character (!@#)
              </p>
            </div>
            <div className="flex space-x-1 text-sm">
              {checkUpperLower(password) ? (
                <Image
                  width={16}
                  height={16}
                  src={`${basePath}/assets/valid.svg`}
                  alt="valid"
                />
              ) : (
                <Image
                  width={16}
                  height={16}
                  src={`${basePath}/assets/not-valid.svg`}
                  alt="not-valid"
                />
              )}
              <p
                className={`${
                  checkUpperLower(password)
                    ? "text-[#808080]"
                    : "text-[#212529]"
                }`}
              >
                One upper and lower letter (Ab)
              </p>
            </div>
            <div className="flex space-x-1 text-sm">
              {checkNumber(password) ? (
                <Image
                  width={16}
                  height={16}
                  src={`${basePath}/assets/valid.svg`}
                  alt="valid"
                />
              ) : (
                <Image
                  width={16}
                  height={16}
                  src={`${basePath}/assets/not-valid.svg`}
                  alt="not-valid"
                />
              )}
              <p
                className={`${
                  checkNumber(password) ? "text-[#808080]" : "text-[#212529]"
                }`}
              >
                One numeric number (123)
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default StrongPassword;
