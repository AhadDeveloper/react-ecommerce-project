import { useSelector } from "react-redux";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import context from "../context/context";

const useSearch = () => {
  const { getItemFromLocalStorage } = useContext(context);
  const role = getItemFromLocalStorage()?.role;
  const { pathname } = useLocation();

  const products = useSelector((state) =>
    pathname.startsWith("/admin") && role === "admin"
      ? state.products.adminProducts
      : state.products.products
  );

  const doSearch = (val) => {
    const query = val.toLowerCase().trim();
    if (!query) return [];

    const queryWords = query.split(" "); // handle multi-word search
    const newProducts = [];

    Object.values(products).forEach((categoryArray) => {
      categoryArray.forEach((obj) => {
        const titleWords = obj.title.toLowerCase().split(" ");

        // check if all query words exist as full words in the title
        const isMatch = queryWords.every((word) => titleWords.includes(word));

        if (isMatch) {
          newProducts.push(obj);
        }
      });
    });

    return newProducts;
  };

  return { doSearch };
};

export default useSearch;
