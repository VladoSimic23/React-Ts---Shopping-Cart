import { useAppDispatch } from "../../app/hooks";
import {
  increaseAmount,
  decreaseAmount,
  removeItemFromCart,
} from "../../features/slices/ProductSlice";
import { CartI } from "../../interface/interface";
import "../../tailwind/tailwind.css";

const CartDetails = (item: CartI) => {
  const { id, title, amount } = item;
  const dispatch = useAppDispatch();

  return (
    <div className="border-b-4 mb-8 pb-4">
      <p className="text-sm">{title}</p>
      <div className="flex justify-around mt-8">
        <span
          className="cursor-pointer"
          onClick={() => dispatch(decreaseAmount(id))}
        >
          -
        </span>
        <span>{amount}</span>
        <span
          className="cursor-pointer"
          onClick={() => dispatch(increaseAmount(id))}
        >
          +
        </span>
      </div>
      <div className="text-center">
        <button
          onClick={() => dispatch(removeItemFromCart(id))}
          className="mx-2 mt-6 bg-white hover:border-gray-900 hover:text-gray-900 rounded border border-gray-800 text-gray-800 px-6 py-1 text-xs hover:bg-gray-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartDetails;
