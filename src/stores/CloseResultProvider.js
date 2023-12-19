import React, { createContext, useState } from 'react';

const CLoseContext = createContext();

const CloseResultProvider = ({ children }) => {
  // state show component ResultList => true
  const [openResult, setOpenResult] = useState();

  // hàm set state component ResultList
  const handleCLoseResult = (isCLose = false) => {
    setOpenResult(isCLose);
  };

  // hàm set state show component MovieDetail
  const handleCLose = fnCLoseResult => {
    fnCLoseResult(true);
  };
  const fnCLose = {
    openResult,
    handleCLose,
    handleCLoseResult,
  };
  return (
    <CLoseContext.Provider value={fnCLose}>{children}</CLoseContext.Provider>
  );
};

export { CLoseContext, CloseResultProvider };
