import { BiSolidError } from "react-icons/bi";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <section className="flex flex-col space-y-6 items-center justify-center min-w-[100dvw] min-h-[100dvh] p-4 bg-gradient-to-r from-green-500 to-white">
      <div className="items-center justify-center space-x-1 lg:flex">
        <BiSolidError className="text-6xl" />{" "}
      </div>
      <div className="max-w-md text-center lg:text-center">
        <h3 className="text-4xl">OOPS! PAGE NOT FOUND</h3>
        <p className="my-4 text-lg">
          You must have picked the wrong page because I haven't been able to
          connect to the page which you have requested for.
        </p>
        <div className="my-8 text-md">
          <Link
            to="/"
            className="w-full p-3 bg-white rounded-lg text-slate-700 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page404;
