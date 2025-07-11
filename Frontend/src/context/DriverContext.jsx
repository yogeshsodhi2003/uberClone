import { createContext, useState, useEffect } from "react";

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [driver, setDriver] = useState(() => {
    const storedDriver = localStorage.getItem("driver");
    return storedDriver ? JSON.parse(storedDriver) : [];
  });

  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("isAuth") === "true";
  });

  // Sync changes to localStorage
  useEffect(() => {
    localStorage.setItem("driver", JSON.stringify(driver));
    localStorage.setItem("isAuth", isAuth.toString());
  }, [driver, isAuth]);

  return (
    <DriverContext.Provider value={{ driver, setDriver, isAuth, setIsAuth }}>
      {children}
    </DriverContext.Provider>
  );
};
