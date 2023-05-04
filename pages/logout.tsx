import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { signOut } from "@/libs/cognito";

const Logout = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  useEffect(() => {
    try {
      signOut();
      window.parent.postMessage(
        {
          formSubmitted: true,
          formName: "logout",
          redirectURL: process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URL || "",
        },
        "*"
      );
      setIsLoading(false);
    } catch (err: any) {
      window.parent.postMessage(
        {
          formSubmitted: false,
          formName: "logout",
          error: err.message,
        },
        "*"
      );
      setIsLoading(false);
      console.log(err.message);
    }
  }, []);

  return <div className="w-full bg-[#fff]">{isLoading && <Loading />}</div>;
};

export default Logout;
