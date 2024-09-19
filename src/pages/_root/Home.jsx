import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserProduct from "../../components/Main/UserProduct";
import { getProductsData } from "../../redux/product/product-actions";
import ProductsParentCard from "../../components/ui/ProductsParentCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProductsData())
      .then(() => setIsLoading(false))
      .catch((err) => setIsError(true));
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

  return (
    <ProductsParentCard className="p-4">
      {Object.values(products).map((category) =>
        category.map((val) => (
          <UserProduct
            key={val.id}
            id={val.id}
            src={val.imageUrl}
            title={val.title}
            price={val.price}
            description={val.description}
            category={val.category}
          />
        ))
      )}
    </ProductsParentCard>
  );
};

export default HomePage;
