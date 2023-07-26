import { useState } from "react";

const useAction = () => {
  const [actionRedirectUrl, setActionRedirectUrl] = useState<string>("");

  return {
    actionRedirectUrl,
    setActionRedirectUrl,
  };
};

export default useAction;
