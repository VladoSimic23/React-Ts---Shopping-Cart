import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/slices/ProductSlice";
import "../../tailwind/tailwind.css";

const Product = ({
  id,
  title,
  image,
  price,
  category,
}: {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      key={id}
      className="text-center p-6 border rounded flex flex-col justify-end"
    >
      <div className="itemToHover relative">
        <NavLink
          to={`/product/${id}`}
          className="absolute w-0  h-full bg-black opacity-60"
        >
          <h3 className="absolute opacity-0  text-white mt-50%">
            View Details
          </h3>
        </NavLink>
        <img
          className="min-[320px]:max-h-52  sm:max-h-60 mx-auto"
          src={image}
          alt={title}
        />
        <h4>{title}</h4>
        <h3>{price}$</h3>
      </div>
      <div className="mt-8">
        <button
          onClick={() => dispatch(addToCart({ id, price, title }))}
          className="mx-2 my-2 bg-white hover:border-gray-900 hover:text-gray-900 rounded border border-gray-800 text-gray-800 px-6 py-2 text-xs hover:bg-gray-100"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
