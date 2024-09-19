import axios from "axios";

import { authActions } from "./auth-slice";

export const sendSignupData = (data) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await axios.post(
        "https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/signup.json",
        data
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Sending signup data failed.");
      }

      return response.data;
    };

    try {
      await sendData();
      dispatch(authActions.signupForm(data));
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const fetchSignupData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://react-ecommerce-store-128af-default-rtdb.firebaseio.com/signup.json"
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("There's an error while fecthing data");
      }

      return response.data;
    };

    try {
      const data = await fetchData();

      let dataArr = [];
      for (const key in data) {
        dataArr.push({
          email: data[key].email,
          password: data[key].password,
          role: data[key].role,
        });
      }
      dispatch(authActions.signinForm(dataArr));
    } catch (err) {
      throw new Error(err);
    }
  };
};
