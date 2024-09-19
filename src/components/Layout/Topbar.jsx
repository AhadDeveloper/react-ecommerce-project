import { useContext } from "react";
import context from "../../context/context";
import { FaThLarge } from "react-icons/fa";

const Topbar = () => {
  const ctx = useContext(context);

  const categoryHandler = () => {
    ctx.setBackdrop(true);
    ctx.setSidebar(true);
  };

  return (
    <div className="bg-[#7695FF] h-12 text-white flex items-center shadow-md">
      <div className="px-5">
        <button
          onClick={categoryHandler}
          className="flex gap-3 items-center px-2 hover:border-2 border-white"
        >
          <FaThLarge size={20} className="text-[#16325B]" />
          <h1 className="sm:text-lg text-sm">Categories</h1>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
