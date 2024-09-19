import axios from "axios";

import { productActions } from "./product-slice";

export const addNewProduct = (data, category) => {
  return async (dispatch) => {
    const sendProductData = async () => {
      const response = await axios.post(
        `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/products/${category}.json`,
        data
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("There's an error while sending data");
      }

      return response.data;
    };

    try {
      const newData = await sendProductData();
    } catch (err) {
      throw err;
    }
  };
};

export const getProductsData = () => {
  return async (dispatch) => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/products.json"
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Error while fetching products");
      }

      return response.data;
    };

    try {
      const data = await fetchProducts();

      const products = {};
      for (const key in data) {
        const product = data[key];
        const productData = [];
        for (const innerKey in product) {
          productData.push({
            id: innerKey,
            title: product[innerKey].title,
            description: product[innerKey].description,
            imageUrl: product[innerKey].imageUrl,
            price: product[innerKey].price,
            category: product[innerKey].category,
          });
        }
        products[key] = productData;
      }
      dispatch(productActions.setProducts(products));
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (category, id) => {
  return async (dispatch) => {
    const deleteRequest = async () => {
      const response = await axios.delete(
        `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/products/${category}/${id}.json`
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("There's an error while deleting data");
      }
    };

    try {
      await deleteRequest();
      dispatch(productActions.deleteProduct({ id }));
    } catch (err) {
      throw err;
    }
  };
};

export const editProductData = (data, category, id) => {
  return async (dispatch) => {
    const putData = async () => {
      const response = await axios.put(
        `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/products/${category}/${id}.json`,
        data
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Error while updating data");
      }

      return response.data;
    };

    try {
      await putData();
    } catch (err) {
      throw err;
    }
  };
};
