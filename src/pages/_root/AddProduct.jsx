import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";

import { addNewProduct } from "../../redux/product/product-actions";
import { editProductData } from "../../redux/product/product-actions";

const addProductSchema = z.object({
  title: z.string().min(5, "Title should be at least 5 characters long"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters long"),
  price: z
    .number()
    .positive({ message: "Price must be a positive number" })
    .min(0.01, { message: "Price must be at least 0.01" })
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Price must have at most 2 decimal places",
    }),
  category: z.enum([
    "electronics",
    "clothing-fashion",
    "home-kitchen",
    "beauty-personal-care",
    "books-stationery",
    "sports-fitness",
    "toys-games",
    "health-wellness",
    "automotive",
    "grocery-food",
    "jewelry-watches",
    "baby-kids",
    "pets",
    "office-supplies",
  ]),
});

const AddProductPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state } = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(state?.src || null);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const initialValues = {
    title: state?.title || "",
    description: state?.description || "",
    price: state?.price || null,
    category: state?.category || "electronics",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(addProductSchema),
  });

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setImageErrorMessage(
        "Invalid file type. Only JPEG, PNG, and GIF are allowed."
      );
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setImageErrorMessage("File size must be less than 3MB.");
      return;
    }

    setImageUploading(true);
    const storageBucket = "react-ecommerce-store-128af.appspot.com";
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o?uploadType=media&name=images/${file.name}`;

    try {
      const response = await axios.post(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/images%2F${encodeURIComponent(
          file.name
        )}?alt=media`;

        setImageUploading(false);
        setImageUrl(downloadURL);
        setImageErrorMessage("");
      } else {
        throw new Error("Upload failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageUploading(false);
      setImageErrorMessage("There's an error while uploading image");
    }
  };

  const editProduct = (data, category, id) => {
    dispatch(editProductData(data, category, id))
      .then(() => {
        reset(initialValues);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        setError("root", {
          type: "manual",
          message: "There's an error while setting data",
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const submitHandler = async (data) => {
    if (!imageUrl) {
      setImageErrorMessage("Please choose file");
      return;
    }

    if (imageUploading) {
      setError("root", {
        type: "manual",
        message: "Wait image is uploading",
      });
      return;
    }

    setIsSubmitting(true);
    const category = data.category;
    const formattedData = {
      imageUrl,
      title: data.title,
      description: data.description,
      price: data.price,
      category,
    };

    if (state?.pageTitle) {
      editProduct(formattedData, category, state?.id);
    } else {
      dispatch(addNewProduct(formattedData, category))
        .then(() => {
          reset(initialValues);
          navigate("/admin");
        })
        .catch((err) => {
          console.log(err);
          setError("root", {
            type: "manual",
            message: "There's an error while setting data",
          });
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <div className="py-6 px-4">
      <div className="flex pb-4">
        <Link
          to=".."
          relative="path"
          className="text-xl underline text-blue-600"
        >
          <MdArrowBack size={25} />
        </Link>
        <h1 className="text-2xl text-blue-600 font-semibold flex-grow text-center">
          {state?.pageTitle ? `${state.pageTitle}` : "Add New Product"}
        </h1>
        <Link to="/admin" className="text-xl underline text-blue-600">
          Admin Page
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-5"
      >
        <div className="text-xl flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            {...register("title")}
            className="w-full outline-none py-1 px-2 rounded-lg focus:border focus:border-blue-400"
          />
          {errors.title && (
            <p className="text-sm lg:text-lg text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="text-xl flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full text-xl h-36 outline-none px-2 rounded-lg focus:border focus:border-blue-400"
          />
          {errors.description && (
            <p className="text-sm lg:text-lg text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="text-xl flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input type="file" className="text-xl" onChange={uploadImage} />
          <div className="mt-5">
            {imageUploading && (
              <p className="text-gray-600 text-lg">Image Uploading...</p>
            )}
            {imageErrorMessage && (
              <p className="text-sm lg:text-lg text-red-500">
                {imageErrorMessage}
              </p>
            )}
            {imageUrl && (
              <img src={imageUrl} alt="product-img" className="w-52 h-44" />
            )}
          </div>
        </div>

        <div className="text-xl flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            step={0.01}
            {...register("price", { valueAsNumber: true })}
            className="w-48 outline-none py-1 px-2 rounded-lg focus:border focus:border-blue-400"
          />
          {errors.price && (
            <p className="text-sm lg:text-lg text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="text-xl flex flex-col gap-2">
          <label htmlFor="categories">Select Categories</label>
          <select
            name="categories"
            id="categories"
            {...register("category")}
            className="w-48 outline-none py-1 px-2 rounded-lg focus:border focus:border-blue-400"
          >
            <option value="electronics">Electronics</option>
            <option value="clothing-fashion">Clothing & Fashion</option>
            <option value="home-kitchen">Home & Kitchen</option>
            <option value="beauty-personal-care">Beauty & Personal Care</option>
            <option value="books-stationery">Books & Stationery</option>
            <option value="sports-fitness">Sports & Fitness</option>
            <option value="toys-games">Toys & Games</option>
            <option value="health-wellness">Health & Wellness</option>
            <option value="automotive">Automotive</option>
            <option value="grocery-food">Grocery & Food</option>
            <option value="jewelry-watches">Jewelry & Watches</option>
            <option value="baby-kids">Baby & Kids</option>
            <option value="pets">Pets</option>
            <option value="office-supplies">Office Supplies</option>
          </select>
          {errors.category && (
            <p className="text-sm lg:text-lg text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="text-center">
          {errors.root && (
            <p className="text-sm lg:text-lg text-red-500 mb-3">
              {errors.root.message}
            </p>
          )}
          <button
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-gray-400" : "bg-blue-600"
            } py-3 px-4 text-white rounded-lg`}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
