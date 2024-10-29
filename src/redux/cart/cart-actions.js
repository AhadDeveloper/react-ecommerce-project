import { cartActions } from "./cart-slice";

export const addToCart = (data, emailKey) => {
  return async (dispatch) => {
    const postDataToCart = async () => {
      const response = await fetch(
        `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/users/${emailKey}/cart.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error while adding cart data");
      }
    };

    try {
      await postDataToCart();
    } catch (err) {
      throw err;
    }
  };
};

export const getFromCart = (emailKey) => {
  return async (dispatch) => {
    const fetchItems = async () => {
      const response = await fetch(
        `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/users/${emailKey}/cart.json`
      );

      if (!response.ok) {
        throw new Error("Error while fetching cart data.");
      }

      return response.json();
    };

    try {
      const data = await fetchItems();
      const cartArr = [];
      for (const key in data) {
        const id = key;
        const items = {
          id,
          title: data[key].title,
          description: data[key].description,
          category: data[key].category,
          price: data[key].price,
          quantity: data[key].quantity,
          imageUrl: data[key].imageUrl,
        };
        cartArr.push(items);
      }
      dispatch(cartActions.getItemsToCart(cartArr));
    } catch (err) {
      throw err;
    }
  };
};

export const deleteItemFromCart = (id, emailKey) => {
  return async (dispatch) => {
    const deleteRequest = async () => {
      const response = await fetch(
        `https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/users/${emailKey}/cart/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error while removing item");
      }
    };

    try {
      await deleteRequest();
      dispatch(cartActions.removeItemFromCart({ id }));
    } catch (err) {
      throw err;
    }
  };
};
