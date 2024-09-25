import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import ProductDetailsManage from "../../components/Main/ProductDetailsManage";
import { getProductsData } from "../../redux/product/product-actions";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const { productId } = useParams();

  const allProducts = Object.values(products).flat();
  const productDetails =
    allProducts.find((item) => item.id === productId) || {};

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProductsData())
      .then(() => setIsError(false))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isError) {
    return (
      <p className="mt-10 text-center sm:text-2xl text-xl text-red-600">
        Error while fetching product details!!!
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

  if (Object.keys(productDetails).length === 0) {
    return (
      <div className="px-4 pt-7">
        <Link
          to={-1}
          relative="path"
          className="text-xl underline text-blue-600"
        >
          <MdArrowBack size={30} />
        </Link>
        <p className="pt-10 text-center md:text-3xl sm:text-2xl text-xl">
          No Product Details found!!!
        </p>
      </div>
    );
  }

  return (
    <ProductDetailsManage
      key={productDetails.id}
      id={productDetails.id}
      title={productDetails.title}
      description={productDetails.description}
      price={productDetails.price}
      src={productDetails.imageUrl}
      category={productDetails.category}
    />
  );
};

export default ProductDetailsPage;
