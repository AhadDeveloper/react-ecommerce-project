import { Link } from "react-router-dom";

const UserProduct = ({ id, src, title, price, description, category }) => {
  if (title.length > 52) {
    title = title.slice(0, 53) + "...";
  }

  const formattedPrice = "Rs. " + price;

  return (
    <Link
      to={`/product-details/${id}`}
      className="bg-white flex flex-col hover:shadow-custom-dark w-[85%] xxs:w-48 md:w-[23%] lg:w-[18%] xl:w-[15.5%] 2xl:w-[13%] xxs:h-72 h-80 rounded-md cursor-pointer"
    >
      <img
        src={src}
        alt="product image"
        className="w-full xxs:h-52 h-60 rounded-t-md object-cover"
      />
      <div className="py-2 px-2 flex flex-col">
        <h1 className="text-sm">{title}</h1>
        <p className="text-[#295F98] font-bold">{formattedPrice}</p>
      </div>
    </Link>
  );
};

export default UserProduct;
