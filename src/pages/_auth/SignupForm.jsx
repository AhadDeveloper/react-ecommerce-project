import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { sendSignupData } from "../../redux/auth/auth-actions";
import context from "../../context/context";

const initialValues = {
  name: "",
  email: "",
  role: "user",
  password: "",
  confirmPassword: "",
};

const sigupSchema = z
  .object({
    name: z.string().min(2, "Name should be at least 2 characters long"),
    email: z.string().email({ message: "Please enter correct email" }),
    role: z.enum(["user", "admin"], { message: "Role is required" }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ctx = useContext(context);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(sigupSchema),
    values: initialValues,
  });

  const submitHandler = (data) => {
    setIsSubmitting(true);
    dispatch(sendSignupData(data))
      .then(() => {
        ctx.setItemToLocalStorage(data.email, data.role);
        reset();
        navigate("/");
      })
      .catch((err) => {
        setError("root", {
          type: "manual",
          message: "There's an error while sending data",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-[#55679C] text-3xl lg:text-4xl font-bold my-2">
        SignUp
      </h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col items-center"
      >
        <div className="py-2">
          <label className="text-[#1E2A5E] text-xl">Name</label>
          <br />
          <input
            type="text"
            {...register("name")}
            className="px-2 py-2 outline-none lg:w-96 w-80 mt-1 rounded-md focus:border-2 focus:border-blue-400"
          />
          <br />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
          )}
        </div>
        <div className="py-2">
          <label className="text-[#1E2A5E] text-xl">Email</label>
          <br />
          <input
            type="email"
            {...register("email")}
            className="px-2 py-2 outline-none lg:w-96 w-80  mt-1 rounded-md focus:border-2 focus:border-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="py-2">
          <label className="text-[#1E2A5E] text-xl">Password</label>
          <br />
          <div className="flex justify-between px-2 py-2 lg:w-96 w-80  mt-1 rounded-md bg-white focus-within:border-2 focus-within:border-blue-400">
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
        <div className="py-2">
          <label className="text-[#1E2A5E] text-xl">Confirm Password</label>
          <br />
          <div className="flex justify-between px-2 py-2 lg:w-96 w-80  mt-1 rounded-md bg-white focus-within:border-2 focus-within:border-blue-400">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="w-full outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="mt-[0.2rem] px-2 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="py-2">
          <div className="flex lg:w-96 w-80 justify-between">
            <label className="text-[#1E2A5E] text-xl">Signup as</label>
            <div className="flex pr-2 gap-7">
              <div>
                <input
                  type="radio"
                  value="user"
                  className="cursor-pointer"
                  {...register("role")}
                />
                <label className="ml-1 text-lg">user</label>
              </div>

              <div>
                <input
                  type="radio"
                  value="admin"
                  className="cursor-pointer"
                  {...register("role")}
                />
                <label className="ml-1 text-lg">admin</label>
              </div>
            </div>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
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
          {isSubmitting ? "Loading..." : "Signup"}
        </button>
      </form>
      <p className="mt-1">
        Already have an account?
        <Link to="/signin" className="text-blue-800 ml-1 hover:text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
