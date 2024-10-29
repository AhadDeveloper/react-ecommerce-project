import axios from "axios";

import { productActions } from "./product-slice";

export const addNewProduct = (data, category, currentUser) => {
  return async (dispatch) => {
    const sendProductData = async () => {
      let productId;
      try {
        const response = await axios.post(
          `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/products/${category}.json`,
          data
        );

        if (response.status !== 200 && response.status !== 201) {
          throw new Error("There's an error while sending data");
        }

        productId = response.data.name;
        console.log(productId);
      } catch (err) {
        throw err;
      }
      try {
        const adminResponse = await axios.put(
          `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/admin/${currentUser}/products/${category}/${productId}.json`,
          data
        );

        if (adminResponse.status !== 200 && adminResponse.status !== 201) {
          throw new Error("There's an error while sending data");
        }
      } catch (err) {
        throw err;
      }
    };

    try {
      await sendProductData();
    } catch (err) {
      throw err;
    }
  };
};

export const getAdminProductsData = (emailKey) => {
  return async (dispatch) => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/admin/${emailKey}/products.json`
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
      dispatch(productActions.setAdminProducts(products));
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

export const deleteProduct = (category, id, emailKey) => {
  return async (dispatch) => {
    const deleteRequest = async () => {
      try {
        const response = await axios.delete(
          `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/products/${category}/${id}.json`
        );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Error deleting product from main database.");
        }
      } catch (error) {
        console.error("Main database deletion error:", error);
        throw error;
      }

      try {
        const adminResponse = await axios.delete(
          `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/admin/${emailKey}/products/${category}/${id}.json`
        );
        if (adminResponse.status !== 200 && adminResponse.status !== 201) {
          throw new Error("Error deleting product from admin database.");
        }
      } catch (error) {
        console.error("Admin database deletion error:", error);
        throw error;
      }
    };

    try {
      await deleteRequest();
      dispatch(productActions.deleteProduct({ id }));
      return { success: true };
    } catch (err) {
      console.error("Deletion error:", err.message);
      throw err;
    }
  };
};

export const editProductData = (data, category, id, emailKey) => {
  return async (dispatch) => {
    const putData = async () => {
      try {
        const response = await axios.put(
          `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/products/${category}/${id}.json`,
          data
        );

        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Error while updating data");
        }
      } catch (err) {
        throw err;
      }
      try {
        const adminResponse = await axios.put(
          `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/admin/${emailKey}/products/${category}/${id}.json`,
          data
        );

        if (adminResponse.status !== 200 && adminResponse.status !== 201) {
          throw new Error("There's an error while deleting data");
        }
      } catch (err) {
        throw err;
      }
    };

    try {
      await putData();
    } catch (err) {
      throw err;
    }
  };
};
