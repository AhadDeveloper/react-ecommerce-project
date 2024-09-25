import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import context from "../../context/context";
import ProductsParentCard from "../../components/ui/ProductsParentCard";
import UserProduct from "../../components/Main/UserProduct";
import AdminProduct from "../../components/Main/AdminProduct";

const SearchDataPage = () => {
  const { state } = useLocation();
  const { getItemFromLocalStorage } = useContext(context);
  const role = getItemFromLocalStorage()?.role;

  if (state.newProducts.length === 0) {
    return (
      <p className="p-6 text-center lg:text-2xl md:text-xl text-lg text-[#1E2A5E]">
        No Products found by this name.
      </p>
    );
  }

  if (state?.pathname === "/admin" && role === "admin") {
    return (
      <div className="p-4 flex flex-col gap-7">
        <Link to="/admin" className="text-xl underline text-blue-600">
          <MdArrowBack size={30} />
        </Link>
        <ProductsParentCard>
          {state.newProducts.map((product) => (
            <AdminProduct
              key={product.id}
              id={product.id}
              title={product.title}
              src={product.imageUrl}
              price={product.price}
              category={product.category}
              description={product.description}
            />
          ))}
        </ProductsParentCard>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-7">
      <Link to=".." relative="path" className="text-xl underline text-blue-600">
        <MdArrowBack size={30} />
      </Link>
      <ProductsParentCard>
        {state.newProducts.map((product) => (
          <UserProduct
            key={product.id}
            id={product.id}
            title={product.title}
            src={product.imageUrl}
            price={product.price}
            description={product.description}
            category={product.category}
          />
        ))}
      </ProductsParentCard>
    </div>
  );
};

export default SearchDataPage;
