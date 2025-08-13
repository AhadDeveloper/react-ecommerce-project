import React, { useContext, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaStore } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import context from "../../context/context";
import Input from "../ui/Input";
import useSearch from "../../hooks/useSearch";
import { getFromCart } from "../../redux/cart/cart-actions";
import useEmailKey from "../../hooks/useEmailKey";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ctx = useContext(context);
  const { emailKey } = useEmailKey(ctx.getItemFromLocalStorage()?.email);
  const cart = useSelector((state) => state.cart.cart);
  const isSignin = ctx.getItemFromLocalStorage();
  const role = ctx.getItemFromLocalStorage()?.role;

  const { doSearch } = useSearch();
  const searchInputRef = useRef();
  const secondSearchInputRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getFromCart(emailKey));
  }, []);

  const searchHandler = useCallback(() => {
    const newProducts = doSearch(searchInputRef.current.value);
    const targetPath =
      pathname.startsWith("/admin") && role === "admin"
        ? "/admin/search-data"
        : "/search-data";
    navigate(targetPath, { state: { newProducts, pathname } });
    searchInputRef.current.value = "";
  }, [doSearch, pathname, navigate, role]);

  const secondSearchHandler = useCallback(() => {
    const newProducts = doSearch(secondSearchInputRef.current.value);
    const targetPath =
      pathname.startsWith("/admin") && role === "admin"
        ? "/admin/search-data"
        : "/search-data";
    navigate(targetPath, { state: { newProducts, pathname } });
    secondSearchInputRef.current.value = "";
  }, [doSearch, pathname, navigate, role]);

  return (
    <nav>
      {/* First Navbar */}
      <div className="hidden xs:flex flex-1 text-white md:h-20 xs:h-16 lg:px-6 px-3 items-center justify-between bg-[#295F98]">
        {/* Logo and Home Link */}
        <div className="flex lg:w-72 md:w-[13.5rem] w-[10.4rem] justify-between items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive && "text-yellow-300"
              } cursor-pointer hover:text-yellow-400 flex flex-col items-center`
            }
          >
            <FaStore className="lg:w-10 md:w-7 md:h-7 w-5 h-5" />
            <p className="text-xs md:text-sm text-center text-white">Home</p>
          </NavLink>
          <h1 className="lg:text-2xl md:text-lg text-sm font-bold">
            Ecommerce <span className="text-yellow-400">Store</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="bg-white lg:w-[28rem] md:w-72 w-56 md:h-9 h-[1.85rem] flex justify-between text-black rounded-md">
          <Input
            ref={searchInputRef}
            className="w-[85%] lg:w-[90%] h-full outline-none px-2 rounded-l-md focus:border focus:border-yellow-500"
          />
          <button
            onClick={searchHandler}
            className="w-[15%] lg:w-[10%] h-full bg-yellow-500 flex items-center justify-center rounded-r-md"
          >
            <FaSearch
              size={20}
              className="text-white cursor-pointer hover:text-black"
            />
          </button>
        </div>

        {/* Cart and Auth Links */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${
              isActive && "text-yellow-300"
            } flex flex-col items-center relative hover:text-yellow-400 cursor-pointer`
          }
        >
          <p className="absolute lg:bottom-7 bottom-6 md:text-lg text-sm text-amber-500">
            {cart.length}
          </p>
          <BiCart className="lg:w-14 md:w-8 h-10 w-7" />
        </NavLink>
        {isSignin ? (
          <Link
            onClick={() => localStorage.removeItem("user")}
            to="/signin"
            className="bg-yellow-500 py-[0.35rem] lg:px-4 md:px-2 px-1 rounded-lg lg:text-lg md:text-sm text-xs"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/signup"
            className="bg-yellow-500 py-[0.35rem] lg:px-4 md:px-2 px-1 rounded-lg lg:text-lg md:text-sm text-xs"
          >
            Signup
          </Link>
        )}

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${
              isActive && "text-yellow-300"
            } cursor-pointer hover:text-yellow-400 flex flex-col items-center`
          }
        >
          <AiOutlineUser className="lg:w-10 md:w-10 w-8 lg:h-9 h-7" />
          <p className="text-xs md:text-sm text-center text-white">Admin</p>
        </NavLink>
      </div>

      {/* Second Navbar for small screens */}
      <div className="xs:hidden flex flex-col h-24 bg-[#295F98]">
        <div className="flex text-white w-full justify-between h-[50%] items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive && "text-yellow-300"
              } cursor-pointer hover:text-yellow-400`
            }
          >
            <FaStore className="w-10 h-5" />
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${
                isActive && "text-yellow-300"
              } cursor-pointer hover:text-yellow-400`
            }
          >
            <BiCart className="w-10 h-8" />
          </NavLink>
          {isSignin ? (
            <Link
              onClick={() => localStorage.removeItem("user")}
              to="/signin"
              className="text-lg p-1 hover:border"
            >
              Logout
            </Link>
          ) : (
            <Link to="/signup" className="text-lg p-1 hover:border">
              Signup
            </Link>
          )}
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${
                isActive && "text-yellow-300"
              } cursor-pointer hover:text-yellow-400`
            }
          >
            <AiOutlineUser className="w-10 h-6" />
          </NavLink>
        </div>
        <div className="w-full h-[50%] text-black flex">
          <Input
            ref={secondSearchInputRef}
            className="h-full w-[87%] outline-none px-2 focus:border-2 focus:border-blue-500"
          />
          <button
            onClick={secondSearchHandler}
            className="h-full w-[13%] bg-yellow-500 flex items-center justify-center"
          >
            <FaSearch
              size={20}
              className="text-white cursor-pointer hover:text-black"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
