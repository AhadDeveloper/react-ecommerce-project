import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import ProductDetailsManage from "../../components/Main/ProductDetailsManage";

const ProductDetailsPage = () => {
  const productDetails = useSelector((state) => state.products.productDetails);

  if (Object.keys(productDetails).length === 0) {
    return (
      <div className="px-4 pt-7">
        <Link
          to=".."
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
      src={productDetails.src}
      category={productDetails.category}
    />
  );
};

export default ProductDetailsPage;
