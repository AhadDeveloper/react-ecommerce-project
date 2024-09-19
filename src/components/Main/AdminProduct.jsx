import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProduct } from "../../redux/product/product-actions";
import { productActions } from "../../redux/product/product-slice";

const AdminProduct = ({ id, src, title, description, price, category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const productDetailsHandler = () => {
    const productDetails = {
      id,
      src,
      title,
      price,
      description,
      category,
    };
    dispatch(productActions.productDetailsHandler(productDetails));
    navigate("/admin/product-details");
  };

  const editHandler = () => {
    navigate("/admin/add-product", {
      state: {
        id,
        title,
        description,
        price,
        category,
        src,
        pageTitle: "Edit Product",
      },
    });
  };

  const deleteHandler = () => {
    setIsSubmitting(true);
    dispatch(deleteProduct(category, id))
      .then(() => {
        setIsError(false);
        setIsSubmitting(false);
        setShowPopup(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsSubmitting(false);
      });
  };

  if (title.length > 52) {
    title = title.slice(0, 53) + "...";
  }

  const formattedPrice = "Rs. " + price;

  return (
    <>
      <div className="bg-white flex flex-col hover:shadow-custom-dark w-48 md:w-[23%] lg:w-[18%] xl:w-[15.5%] 2xl:w-[13%] h-80 rounded-md">
        <img
          src={src}
          onClick={productDetailsHandler}
          className="w-full h-52 rounded-t-md object-cover cursor-pointer"
        />
        <div className="py-2 px-2 flex flex-col">
          <h1 className="text-sm">{title}</h1>
          <p className="text-[#295F98] font-bold">{formattedPrice}</p>
        </div>
        <div className="pr-3 pl-2 py-1 flex justify-between">
          <button
            onClick={editHandler}
            className="py-1 px-3 bg-blue-500 hover:bg-blue-400 text-white rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => setShowPopup(true)}
            className="py-1 px-3 bg-red-500 hover:bg-red-400 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed z-10 top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
          <div className="py-6 px-7 bg-[#E7F0DC] shadow-md text-white flex flex-col gap-6 rounded-md border border-[#36BA98]">
            <p className="md:text-lg xs:text-sm text-xs text-[#088395] font-bold">
              Are you sure you want to delete?
            </p>

            {isError && (
              <p className="sm:text-[1rem] text-xs text-center text-red-500 font-bold">
                Error while deleting data
              </p>
            )}

            <div className="flex gap-5 justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-blue-400 rounded-lg text-sm"
              >
                cancel
              </button>

              <button
                className={`${
                  isSubmitting ? "bg-gray-500" : "bg-red-500"
                } px-4 py-2 rounded-lg text-sm`}
                type="submit"
                onClick={deleteHandler}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProduct;
