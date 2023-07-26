import { createContext, useContext, ReactNode } from "react";
import PropTypes from "prop-types";

import useAction from "@/libs/hooks/useAction";

export const ActionContext = createContext({
  actionRedirectUrl: "",
  setActionRedirectUrl: (value: string) => {},
});

export const ActionProvider = ({ children }: { children: ReactNode }) => {
  const { actionRedirectUrl, setActionRedirectUrl } = useAction();

  return (
    <ActionContext.Provider
      value={{
        actionRedirectUrl,
        setActionRedirectUrl,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useActionValue = () => useContext(ActionContext);

ActionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
