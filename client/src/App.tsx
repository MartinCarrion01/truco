import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useSessionUser } from "./store/userStore";
import { useToast } from "@chakra-ui/react";

export const ErrorContext = createContext({
  setError: (message: string) => {},
});

function App() {
  const user = useSessionUser();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const contextValue = useMemo(() => {
    const hash = {
      setError: (message: string) => {
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      },
    }
    return hash
  }, [toast])

  return (
    <ErrorContext.Provider value={contextValue}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ErrorContext.Provider>
  );
}

export default App;
