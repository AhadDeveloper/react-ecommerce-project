import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { fetchSignupData } from "../../redux/auth/auth-actions";
import context from "../../context/context";

const initialValues = {
  email: "",
  password: "",
};

const signinSchema = z.object({
  email: z.string().email({ message: "Please enter correct email" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const SigninForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const siginData = useSelector((state) => state.auth.signin);

  const ctx = useContext(context);

  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchSignupData()).catch((err) => setIsError(true));
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(signinSchema),
    values: initialValues,
  });

  const submitHandler = (data) => {
    setIsSubmitting(true);
    console.log(data);
    for (const item of siginData) {
      if (item.email === "" && item.password === "" && isError) {
        setError("root", {
          type: "manual",
          message: "There's an error check your internet",
        });
        setIsSubmitting(false);
        return;
      }
      if (item.email === data.email && item.password === data.password) {
        ctx.setItemToLocalStorage(data.email, item.role);
        setTimeout(() => {
          setIsSubmitting(false);
          reset("");
          navigate("/");
        }, 1000);

        return;
      }
    }
    setError("root", {
      type: "manual",
      message: "Invalid email address or password",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      <h1 className="text-[#55679C] text-3xl lg:text-4xl font-bold mt-3">
        Login
      </h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col items-center"
      >
        <div className="py-2">
          <label className="text-[#1E2A5E] text-xl">Email</label>
          <br />
          <input
            type="email"
            {...register("email")}
            className="px-2 py-2 outline-none lg:w-96 w-80 mt-2 rounded-md focus:border-2 focus:border-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="py-2">
          <label className="text-[#1E2A5E] text-xl">Password</label>
          <br />
          <div className="flex justify-between px-2 py-2 lg:w-96 w-80  mt-2 rounded-md bg-white focus-within:border-2 focus-within:border-blue-400">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mt-[0.2rem] px-2 cursor-pointer text-gray-600"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        <button
          disabled={isSubmitting}
          className={`${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-800 hover:bg-blue-500"
          } text-white lg:w-fit w-80 mt-6 px-4 py-2 rounded-md cursor-pointer`}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account?
        <Link to="/signup" className="text-blue-800 hover:text-blue-500 ml-1">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default SigninForm;
