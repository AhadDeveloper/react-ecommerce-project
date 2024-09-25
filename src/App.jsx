import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ContextProvider from "./context/ContextProvider";

import {
  RootLayout,
  SiginForm,
  SignupForm,
  ErrorPage,
  HomePage,
  StaticPage,
  AdminPage,
  AddProductPage,
  CategoryPage,
  SearchDataPage,
  ProductDetailsPage,
  CartPage,
} from "./pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search-data", element: <SearchDataPage /> },
      { path: "product-details", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "category/:categoryId", element: <CategoryPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "admin/product-details", element: <ProductDetailsPage /> },
      { path: "admin/add-product", element: <AddProductPage /> },
      { path: "footer/:pageId", element: <StaticPage /> },
    ],
  },

  { path: "/signin", element: <SiginForm /> },
  { path: "/signup", element: <SignupForm /> },
]);

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ContextProvider>
  );
}

export default App;
