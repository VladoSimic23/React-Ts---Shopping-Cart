import { useNavigate, useParams } from "react-router-dom";
import useFetchDB from "../../features/fetchData/useFetchAPI";
import { ProductsI } from "../../interface/interface";
import { singleProduct } from "../../urls";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import "../../tailwind/tailwind.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addToCart,
  getTotal,
  selectProducts,
} from "../../features/slices/ProductSlice";
import { useEffect } from "react";

const SingleProduct = () => {
  const { id: itemId } = useParams();
  const { dataDb, loadingDb, errorDb } = useFetchDB(
    `${singleProduct}${itemId}`
  );
  const data: ProductsI = dataDb;
  const dispatch = useAppDispatch();
  const {
    productsState: { cart },
  } = useAppSelector(selectProducts);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(getTotal({}));
  }, [cart, dispatch]);

  if (errorDb) {
    return <Error error={errorDb} />;
  }
  if (loadingDb) {
    return <Loading />;
  }

  const { id, title, description, image, price, category, rating } = data;

  return (
    <div className="container mx-auto max-w-6xl p-8">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mx-2 my-2 bg-white hover:border-gray-900 hover:text-gray-900 rounded border border-gray-800 text-gray-800 px-6 py-2 text-xs hover:bg-gray-100"
        >
          {`<  Go Back`}
        </button>
      </div>
      <h1 className="border-b-2 inline-block pb-2">{title}</h1>
      <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-8 mt-20">
        <div className="lg:col-span-1">
          <img
            className="min-[320px]:max-h-52 sm:max-h-80 mx-auto"
            src={image}
            alt={title}
          />
        </div>
        <div className="lg:col-span-3">
          <p>{description}</p>
          <p className="pt-8">Price: {price}$</p>
          <p>Category: {category}</p>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Rating star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              Rating: {rating?.rate}
            </p>
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
      </div>
    </div>
  );
};

export default SingleProduct;
