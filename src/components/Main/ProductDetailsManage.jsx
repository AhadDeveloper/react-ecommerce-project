import { useState, useReducer, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import context from "../../context/context";
import useEmailKey from "../../hooks/useEmailKey";
import { addToCart, getFromCart } from "../../redux/cart/cart-actions";
import useFormattedCategory from "../../hooks/useFormattedCategory";
import { MdArrowBack } from "react-icons/md";

const cartReducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      isLoading: action.isLoading,
      isError: state.isError,
      isSuccessful: state.isSuccessful,
    };
  } else if (action.type === "ERROR") {
    return {
      isLoading: state.isLoading,
      isError: action.isError,
      isSuccessful: action.isSuccessful,
    };
  }
  return state;
};

const ProductDetailsManage = ({
  id,
  title,
  description,
  price,
  src,
  category,
}) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [userErrorMsg, setUserErrorMsg] = useState(false);

  const disableBtn = quantity <= 1;
  const { getItemFromLocalStorage } = useContext(context);
  const userInfo = getItemFromLocalStorage();
  const { emailKey } = useEmailKey(getItemFromLocalStorage()?.email);

  const { formattedCategory } = useFormattedCategory(category);

  const [cartState, dispatchCartReducer] = useReducer(cartReducer, {
    isLoading: false,
    isError: false,
    isSuccessful: false,
  });

  const cartHandler = () => {
    if (!userInfo) {
      setUserErrorMsg(true);
      return;
    }
    dispatchCartReducer({ type: "LOADING", isLoading: true });
    const cartData = {
      title,
      description,
      imageUrl: src,
      price: price * quantity,
      category,
      quantity,
    };

    dispatch(addToCart(cartData, emailKey))
      .then(() => {
        dispatchCartReducer({
          type: "ERROR",
          isError: false,
          isSuccessful: true,
        });

        return dispatch(getFromCart(emailKey));
      })
      .then(() => {
        dispatchCartReducer({ type: "LOADING", isLoading: false });
      })
      .catch(() => {
        dispatchCartReducer({
          type: "ERROR",
          isError: true,
          isSuccessful: false,
        });
        dispatchCartReducer({ type: "LOADING", isLoading: false });
      });
  };

  return (
    <div className="px-6 pt-8 pb-16 flex flex-col gap-14">
      <div className="flex items-center justify-start">
        <Link to={-1} className="text-xl underline text-blue-600">
          <MdArrowBack size={30} />
        </Link>
        <h1 className="flex-grow lg:text-3xl text-2xl text-[#604CC3] font-bold text-center">
          PRODUCT DETAILS
        </h1>
      </div>
      <div className="lg:grid lg:grid-cols-3 flex flex-col gap-10">
        <div className="lg:col-span-1 flex justify-center">
          <img src={src} className="lg:w-96 lg:h-96 h-80" />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2">
          <h1 className="font-bold lg:text-3xl sm:text-2xl text-xl">{title}</h1>
          <hr className="border-gray-400" />
          <p className="lg:text-xl sm:text-lg text-sm">{description}</p>
          <hr className="border-gray-400" />
          <p className="lg:text-xl text-lg font-bold">{"Rs. " + price}</p>
          <hr className="border-gray-400" />
          <p className="lg:text-xl text-lg font-bold">{formattedCategory}</p>
          <hr className="border-gray-400" />
          <div className="md:flex md:flex-row gap-7 items-center flex flex-col">
            <p className="lg:text-xl text-lg">Quantity</p>
            <div className="flex gap-4">
              <button
                onClick={() => setQuantity((prevState) => prevState + 1)}
                className="px-3 p-1 bg-gray-400 rounded-sm font-bold text-lg"
              >
                +
              </button>
              <input
                disabled={true}
                type="text"
                className="h-9 w-7 outline-none text-center bg-transparent text-lg"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
              <button
                onClick={() => setQuantity((prevState) => prevState - 1)}
                className={`${
                  disableBtn && "cursor-not-allowed"
                } px-[0.85rem] p-1 bg-gray-400 rounded-sm font-bold text-lg`}
                disabled={disableBtn}
              >
                -
              </button>
            </div>
            <div>
              <button
                disabled={cartState.isLoading}
                onClick={cartHandler}
                className={`${
                  cartState.isLoading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-orange-500"
                } px-4 py-2 text-white rounded-full md:text-lg text-sm cursor-pointer`}
              >
                {cartState.isLoading ? "Loading..." : "Add To Cart"}
              </button>
            </div>
            {userErrorMsg && (
              <p className="text-red-700 text-lg">
                Login first before you add to cart
              </p>
            )}
            {cartState.isError && (
              <p className="text-red-700 text-lg">Can't add Try again...</p>
            )}
            {cartState.isSuccessful && (
              <p className="text-green-700 text-lg">Product added to cart ✔</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsManage;
