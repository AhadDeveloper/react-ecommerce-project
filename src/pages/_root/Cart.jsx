import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import context from "../../context/context";
import useEmailKey from "../../hooks/useEmailKey";
import CartItem from "../../components/Cart/CartItem";
import { getFromCart } from "../../redux/cart/cart-actions";
import { MdArrowBack } from "react-icons/md";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const { getItemFromLocalStorage } = useContext(context);
  const { emailKey } = useEmailKey(getItemFromLocalStorage()?.email);

  let totalPrice = 0;

  cartItems.forEach((item) => (totalPrice += item.price));

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getFromCart(emailKey))
      .then(() => setIsError(false))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isError) {
    return (
      <p className="mt-10 text-center sm:text-2xl text-xl text-red-600">
        Error while fetching cart data!!!
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="mt-10 text-center sm:text-2xl text-xl text-gray-700">
        Loading....
      </p>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center gap-14">
        <h1 className="md:text-3xl text-2xl text-gray-700 font-bold">
          Shopping Cart
        </h1>
        <p className="text-center sm:text-2xl text-xl text-gray-700">
          No Cart Items found!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 mb-10 flex flex-col gap-10">
      <div className="flex items-center justify-start">
        <Link
          to=".."
          relative="path"
          className="text-xl underline text-blue-600"
        >
          <MdArrowBack size={30} />
        </Link>
        <h1 className="text-3xl text-gray-700 font-bold flex-grow text-center">
          Shopping Cart
        </h1>
      </div>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col gap-10 md:w-[70%]">
          {cartItems.map((cart) => (
            <CartItem
              key={cart.id}
              id={cart.id}
              title={cart.title}
              price={cart.price}
              category={cart.category}
              quantity={cart.quantity}
              src={cart.imageUrl}
            />
          ))}
        </div>
        <div className="flex sm:flex-row flex-col gap-10 items-center">
          <p className="flex gap-3 items-center sm:text-lg text-sm">
            <span className="sm:text-xl text-lg text-gray-800 font-bold">
              Total Price:
            </span>
            Rs. {totalPrice}
          </p>
          <button className="py-2 px-3 bg-gray-800 text-white rounded-md">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
