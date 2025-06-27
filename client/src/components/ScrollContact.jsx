import React, { createContext, useContext, useRef } from "react";

const ScrollContext = createContext();
export const useScroll = () => useContext(ScrollContext);
export const ScrollProvider = ({ children }) => {
  const contactRef = useRef(null);
  return (
    <ScrollContext.Provider value={{ contactRef }}>
      {children}
    </ScrollContext.Provider>
  );
};
