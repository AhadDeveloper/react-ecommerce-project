import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductsData } from "../../redux/product/product-actions";
import ProductsParentCard from "../../components/ui/ProductsParentCard";
import UserProduct from "../../components/Main/UserProduct";
import AdminProduct from "../../components/Main/AdminProduct";

import { MdArrowBack } from "react-icons/md";
import context from "../../context/context";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { pathname, state } = useLocation();

  const { getItemFromLocalStorage } = useContext(context);
  const role = getItemFromLocalStorage()?.role;

  const products = useSelector((state) =>
    pathname.startsWith("/admin") && role === "admin"
      ? state.products.adminProducts
      : state.products.products
  );
  const { categoryId } = useParams();

  const categoryProducts = products[categoryId];

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!products || Object.keys(products).length === 0) {
      setIsLoading(true);
      dispatch(getProductsData())
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [dispatch]);

  if (isError) {
    return (
      <div className="pt-14 px-4 flex justify-center items-center">
        <p className="text-red-500 md:text-2xl xs:text-xl text-lg">
          There's an error while loading products! check your internet
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <p className="mt-10 text-center text-2xl text-[#2C3E50]">Loading....</p>
    );
  }

  if (!categoryProducts) {
    return (
      <p className="p-6 text-center lg:text-2xl md:text-xl text-lg text-[#1E2A5E]">
        No Products found in this category.
      </p>
    );
  }

  if (state?.pathname === "/admin" && role === "admin") {
    return (
      <div className="p-4 flex flex-col gap-7">
        <Link to="/admin" className="text-xl underline text-blue-600">
          <MdArrowBack size={30} />
        </Link>
        <ProductsParentCard className="p-4">
          {categoryProducts.map((val) => (
            <AdminProduct
              key={val.id}
              id={val.id}
              src={val.imageUrl}
              title={val.title}
              price={val.price}
              category={val.category}
              description={val.description}
            />
          ))}
        </ProductsParentCard>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-7">
      <Link to="/" className="text-xl underline text-blue-600">
        <MdArrowBack size={30} />
      </Link>
      <ProductsParentCard className="p-4">
        {categoryProducts.map((val) => (
          <UserProduct
            key={val.id}
            id={val.id}
            src={val.imageUrl}
            title={val.title}
            price={val.price}
            category={val.category}
            description={val.description}
          />
        ))}
      </ProductsParentCard>
    </div>
  );
};

export default CategoryPage;
