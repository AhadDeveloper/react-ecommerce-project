import { createContext } from "react";

const context = createContext({
  setItemToLocalStorage: (email, role) => {},
  getItemFromLocalStorage: () => {},
  setBackdrop: (val) => {},
  setSidebar: (val) => {},
  showBackdrop: false,
  showSidebar: false,
});

export default context;
