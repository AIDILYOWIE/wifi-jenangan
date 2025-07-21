import React, { useState, createContext } from "react";
import { useContext } from "react";

const SendData = createContext({});
const SendType = createContext('')

export const useDataContext = () => useContext(SendData);
export const useTypeContext = () => useContext(SendType)

export const SendDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [type, setType] = useState('')

  return (
    <SendData.Provider value={{ data, setData, type, setType}}>{children}</SendData.Provider>
  );
};

export default SendData;
