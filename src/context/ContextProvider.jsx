import { useState } from "react";

import context from "./context";

const ContextProvider = (props) => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const setItemToLocalStorage = (email, role) => {
    localStorage.setItem("user", JSON.stringify({ email, role }));
  };

  const getItemFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const setBackdrop = (val) => {
    setShowBackdrop(val);
  };

  const setSidebar = (val) => {
    setShowSidebar(val);
  };

  const value = {
    setItemToLocalStorage,
    getItemFromLocalStorage,
    setBackdrop,
    setSidebar,
    showBackdrop,
    showSidebar,
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export default ContextProvider;
