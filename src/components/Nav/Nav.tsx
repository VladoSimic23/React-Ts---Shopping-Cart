import { FaCartArrowDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openCart, selectProducts } from "../../features/slices/ProductSlice";
import "../../tailwind/tailwind.css";

const Nav = () => {
  const dispatch = useAppDispatch();
  const {
    productsState: { totalItems },
  } = useAppSelector(selectProducts);

  return (
    <div className="bg-gray-200 sticky top-0 z-20">
      <div className="container mx-auto pl-4 pr-4">
        <div className="flex justify-between items-center">
          <h2>Shopping Cart </h2>
          <div className="relative">
            <FaCartArrowDown
              onClick={() => dispatch(openCart({}))}
              className={`text-3xl cursor-pointer`}
            />
            <span className="absolute right-5 top-6 rounded-full p-2 text-xs border-transparent font-bold text-white py-0.5 bg-violet-500 px-1.5">
              {totalItems}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
