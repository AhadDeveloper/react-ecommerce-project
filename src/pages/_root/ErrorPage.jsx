import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <h1 className="md:text-3xl text-2xl">Page Error</h1>
      <p className="md:text-2xl text-xl text-red-600 px-4 py-6">
        Could not find resource or page
      </p>

      <Link
        to="/"
        className="p-3 md:text-lg text-sm bg-red-600 hover:bg-red-400 rounded-lg text-white cursor-pointer"
      >
        Go to HomePage
      </Link>
    </div>
  );
};

export default ErrorPage;
