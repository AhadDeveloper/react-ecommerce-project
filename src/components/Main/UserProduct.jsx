import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productActions } from "../../redux/product/product-slice";

const UserProduct = ({ id, src, title, price, description, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (title.length > 52) {
    title = title.slice(0, 53) + "...";
  }

  const formattedPrice = "Rs. " + price;

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
    navigate("/product-details");
  };

  return (
    <div
      onClick={productDetailsHandler}
      className="bg-white flex flex-col hover:shadow-custom-dark w-48 md:w-[23%] lg:w-[18%] xl:w-[15.5%] 2xl:w-[13%] h-72 rounded-md cursor-pointer"
    >
      <img src={src} className="w-full h-52 rounded-t-md object-cover" />
      <div className="py-2 px-2 flex flex-col">
        <h1 className="text-sm">{title}</h1>
        <p className="text-[#295F98] font-bold">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default UserProduct;
