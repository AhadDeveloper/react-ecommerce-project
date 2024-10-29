import { useState, useContext } from "react";
import { useDispatch } from "react-redux";

import context from "../../context/context";
import useEmailKey from "../../hooks/useEmailKey";
import useFormattedCategory from "../../hooks/useFormattedCategory";
import { deleteItemFromCart } from "../../redux/cart/cart-actions";

const CartItem = ({ id, title, price, category, quantity, src }) => {
  const dispatch = useDispatch();
  const { getItemFromLocalStorage } = useContext(context);
  const { emailKey } = useEmailKey(getItemFromLocalStorage()?.email);
  const { formattedCategory } = useFormattedCategory(category);

  const [isLoading, setIsLoading] = useState(false);

  const removeItemHandler = () => {
    setIsLoading(true);
    dispatch(deleteItemFromCart(id, emailKey)).finally(() =>
      setIsLoading(false)
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img src={src} alt="cart-img" className="w-48 h-48" />
        <div className="flex flex-col gap-5 font-bold">
          <h1 className="text-xl">{title}</h1>
          <p>Rs. {price}</p>
          <div className="flex gap-8">
            <p>Quantity: {quantity}</p>
            <p>{formattedCategory}</p>
          </div>
          <div>
            <button
              disabled={isLoading}
              onClick={removeItemHandler}
              className={`${
                isLoading ? "bg-gray-700 text-white" : "bg-cyan-400"
              } py-2 px-3 rounded-md text-gray-800 hover:bg-cyan-500 font-bold`}
            >
              {isLoading ? "Removing..." : "Remove from cart"}
            </button>
          </div>
        </div>
      </div>
      <hr className="border border-gray-500" />
    </div>
  );
};

export default CartItem;
