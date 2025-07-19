import React, { useState, createContext } from "react";
import { useContext } from "react";

const SendData = createContext({});

export const useDataContext = () => useContext(SendData);

export const SendDataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <SendData.Provider value={{ data, setData}}>{children}</SendData.Provider>
  );
};

export default SendData;
