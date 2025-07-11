import { createContext, useContext, useRef, useState } from "react";

const ScrollContext = createContext();
const ErrorContext = createContext();
export const useScroll = () => useContext(ScrollContext);
export const useError = () => useContext(ErrorContext);
export const ContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <ScrollContext.Provider value={{ contactRef, aboutRef }}>
        {children}
      </ScrollContext.Provider>
    </ErrorContext.Provider>
  );
};
