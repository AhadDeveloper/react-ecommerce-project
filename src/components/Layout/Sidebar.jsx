import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { allCategories } from "../../constants/index";
import { BiMenu } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import context from "../../context/context";

const Sidebar = () => {
  const ctx = useContext(context);
  const role = ctx.getItemFromLocalStorage()?.role;
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  const [isHover, setIsHover] = useState(false);

  const categoryHandler = () => {
    ctx.setBackdrop(false);
    ctx.setSidebar(false);
    setIsHover(false);
  };

  if (ctx.showSidebar) {
    return (
      <div className="fixed inset-0 z-30 w-80 h-screen bg-white text-black overflow-y-scroll">
        <div className="bg-[#1230AE] py-5 px-4 flex items-center gap-3">
          <button
            onClick={categoryHandler}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {!isHover ? (
              <BiMenu size={30} color="white" />
            ) : (
              <FaTimes size={28} color="white" />
            )}
          </button>
          <h1 className="text-white text-2xl text-center">Select Category</h1>
        </div>
        <ul className="text-lg p-5 flex flex-col gap-10 font-bold">
          <NavLink
            to="/"
            state={{ pathname }}
            onClick={categoryHandler}
            className={({ isActive }) => `${isActive && "text-blue-700"}`}
          >
            <li>All Products</li>
          </NavLink>
          {allCategories.categories.map((category) => {
            const link =
              isAdmin && role === "admin"
                ? `/admin/${category.link}`
                : category.link;
            return (
              <NavLink
                to={link}
                state={{ pathname }}
                onClick={categoryHandler}
                className={({ isActive }) => `${isActive && "text-blue-600"}`}
                key={category.name}
              >
                <li>{category.name}</li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Sidebar;
