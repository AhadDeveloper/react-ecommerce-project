import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import context from "../../context/context";
import { getAdminProductsData } from "../../redux/product/product-actions";

import AdminProduct from "../../components/Main/AdminProduct";
import ProductsParentCard from "../../components/ui/ProductsParentCard";
import useEmailKey from "../../hooks/useEmailKey";

const AdminPage = () => {
  const { getItemFromLocalStorage } = useContext(context);
  const role = getItemFromLocalStorage()?.role;
  const { emailKey } = useEmailKey(getItemFromLocalStorage()?.email);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.adminProducts);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAdminProductsData(emailKey))
      .then(() => setIsLoading(false))
      .catch((err) => setIsError(true));
  }, [dispatch]);

  if (isError) {
    return (
      <div className="pt-14 px-4 flex justify-center items-center">
        <p className="text-red-500 md:text-2xl xs:text-xl text-lg">
          There's an error while loading admin data! check your internet
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <p className="mt-10 text-center text-2xl text-[#2C3E50]">Loading....</p>
    );
  }

  if (role === "user" || !role) {
    return (
      <div className="flex flex-col items-center pt-7 px-4 gap-6">
        <p className="lg:text-3xl md:text-2xl text-xl text-red-500">
          You don't have access to this page.
        </p>
        <p className="lg:text-2xl md:text-xl text-lg">
          Signup as an admin or login from admin account to access this page{" "}
          <Link to="/signup" className="underline text-blue-600">
            Go to signup
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="px-4 py-4 flex flex-col gap-10">
        <h1 className="text-center text-3xl font-bold text-gray-700">
          Admin Dashboard
        </h1>
        <div className="text-center">
          <Link
            to="/admin/add-product"
            className="px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full"
          >
            Add product
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl text-gray-700">All Products</h2>
          <ProductsParentCard>
            {Object.values(products).map((category) =>
              category.map((val) => (
                <AdminProduct
                  key={val.id}
                  id={val.id}
                  src={val.imageUrl}
                  title={val.title}
                  description={val.description}
                  price={val.price}
                  category={val.category}
                />
              ))
            )}
          </ProductsParentCard>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
