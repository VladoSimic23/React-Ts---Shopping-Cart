import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FaTrash } from "react-icons/fa";
import {
  closeCart,
  emptyCart,
  selectProducts,
} from "../../features/slices/ProductSlice";
import "../../tailwind/tailwind.css";
import CartDetails from "./CartDetails";

const Cart = () => {
  const {
    productsState: { cart, isCartOpen, total, totalItems },
  } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`fixed right-0 top-0 bg-gray-100 h-screen z-30 p-6 w-96 transition-all duration-500 ease-in-out overflow-y-scroll ${
        isCartOpen && "toggleCart"
      }`}
    >
      <h3 className="text-right mt-2 mb-16">
        <span
          className="text-3xl cursor-pointer"
          onClick={() => dispatch(closeCart({}))}
        >
          &times;
        </span>
      </h3>
      {cart.length < 1 && <h3>Your Cart Is Empty</h3>}{" "}
      {cart.length > 0 && (
        <div>
          {cart.map((item) => {
            return <CartDetails key={item.id} {...item} />;
          })}
        </div>
      )}
      <div className="mt-16">
        <p>Items: {totalItems}</p>
        <p>Total Price: {total}$</p>
      </div>
      {cart.length > 0 && (
        <div className="mt-16">
          <button
            onClick={() => dispatch(emptyCart({}))}
            className="flex flex-row items-center mx-2 mt-6 bg-white hover:border-gray-900 hover:text-gray-900 rounded border border-gray-800 text-gray-800 px-6 py-1 text-xs hover:bg-gray-100"
          >
            <FaTrash />
            <span className="ml-4"> Clear Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
