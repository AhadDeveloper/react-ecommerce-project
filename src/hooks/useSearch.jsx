import { useSelector } from "react-redux";

const useSearch = () => {
  const products = useSelector((state) => state.products.adminProducts);

  const doSearch = (val) => {
    const newProducts = [];
    Object.values(products).forEach((categoryArray) => {
      categoryArray.forEach((obj) => {
        if (
          obj.title.toLowerCase().includes(val.toLowerCase()) &&
          val.trim() !== ""
        ) {
          newProducts.push(obj);
        }
      });
    });

    return newProducts;
  };

  return { doSearch };
};

export default useSearch;
