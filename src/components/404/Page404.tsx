import { NavLink } from "react-router-dom";
import "../../tailwind/tailwind.css";

const Page404 = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-max mx-auto mt-60">
        <h1>This page does not exist...</h1>
        <NavLink
          className="mx-2 my-2 bg-white hover:border-gray-900 hover:text-gray-900 rounded border border-gray-800 text-gray-800 px-6 py-2 text-xs hover:bg-gray-100"
          to="/"
        >
          Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default Page404;
