import { createContext } from "react";
import { useMediaQuery } from "react-responsive";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
  isMobile: false,
});

type UserProviderType = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderType) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <UserContext.Provider
      value={{
        isMobile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
