// ButtonContext.js
import React, { useState, createContext } from "react";

 const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <ButtonContext.Provider value={{ open, setOpen }}>
      {children}
    </ButtonContext.Provider>
  );
};

export default ButtonContext