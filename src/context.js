import React, { createContext, useContext, useState } from "react";

export const namecontext = createContext();

export const ContextProvider = ({ children}) => {
 const[date,setdate]=useState([])
 
const selectdate=(data)=>{
    setdate([...date,data])
}

  return <namecontext.Provider value={{date,selectdate}}> {children}  </namecontext.Provider>
};

export const Contextstate = () => {
  
  const { date,selectdate} = useContext(namecontext);
  return {date,selectdate};
};

