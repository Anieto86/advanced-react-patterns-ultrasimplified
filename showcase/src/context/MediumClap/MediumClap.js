import React, { useState, createContext } from 'react';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};

export const ClapContext = createContext();


const ClapProvider = ({ children }) => {
  const [clapState, setClapState] = useState(initialState);
  



  return (
    <ClapContext.Provider 
    value={{ ...clapState }}>{children}
    </ClapContext.Provider>
  );
};

export default ClapProvider ;