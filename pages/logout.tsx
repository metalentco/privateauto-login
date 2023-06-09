import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { initConfig, signOut } from "@/libs/cognito";

const Logout = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  // const [redirectUrl, setRedirectUrl] = useState<string>('');


  useEffect(() => {
    try {
      initConfig(window)
        .then((cfg: any) => {
          const redirectUrl = cfg.redirectUrl;
          signOut();
          console.log(`signout : [${redirectUrl}]`);
          window?.parent && window.parent.postMessage({ formSubmitted: true, formName: "logout", }, "*");
          if (window.parent)
            window.parent.location.replace(redirectUrl);
          else
            window.location.replace(redirectUrl);
          setIsLoading(false);
        });
    } catch (err: any) {
      console.log(err);
      window?.parent && window.parent.postMessage(
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

  return <div className="w-full bg-[#fff]">{isLoading && <Loading />}logging out....</div>;
};

export default Logout;
