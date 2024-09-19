import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { pages } from "../../constants";

const StaticPage = () => {
  const { page } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (!pages[page]) {
    return (
      <div className="mt-5">
        <h1 className="text-center lg:text-3xl text-2xl text-red-500">
          Page not found!
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h1 className="text-center md:text-2xl text-xl font-semibold">
        {pages[page].title}
      </h1>
      <p className="py-5 px-4 md:text-xl text-lg text-justify">
        {pages[page].description}
      </p>
      <div className="flex justify-center mb-16 mt-4">
        <Link
          to=".."
          className="p-3 md:text-lg text-sm bg-purple-600 hover:bg-purple-500 rounded-lg text-white cursor-pointer"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default StaticPage;
