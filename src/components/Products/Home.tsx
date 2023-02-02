import useFetchDB from "../../features/fetchData/useFetchAPI";
import { ProductsI } from "../../interface/interface";
import { productsUrl } from "../../urls";
import Error from "../Error/Error";
import "../../tailwind/tailwind.css";
import Categories from "../Categories/Categories";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getCategoryStorage,
  getTotal,
  selectProducts,
  setProducts,
} from "../../features/slices/ProductSlice";
import ProductsByCategory from "../Categories/ProductsByCategory";
import Product from "./Product";
import { capitalizeFirstLetter } from "../../utils";

const Home = () => {
  const { dataDb, errorDb } = useFetchDB(productsUrl);
  const {
    productsState: { products, currentCategory, cart },
  } = useAppSelector(selectProducts);
  const data: ProductsI[] = dataDb;
  const dispatch = useAppDispatch();

  const memoizedData = useMemo(() => products, [products]);

  useEffect(() => {
    dispatch(getCategoryStorage({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotal({}));
  }, [cart, dispatch]);

  useEffect(() => {
    if (memoizedData.length < 1) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch, memoizedData]);

  if (errorDb) {
    return <Error error={errorDb} />;
  }

  return (
    <div className="p-8">
      <div className="text-center mb-16">
        <h1 className="text-center border-b-2 inline-block">
          {capitalizeFirstLetter(currentCategory)} Items
        </h1>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-6">
        <Categories />
        <div className="grid lg:col-span-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-center gap-8 ">
          {currentCategory === "all" &&
            memoizedData &&
            memoizedData.map((data) => {
              const { id, title, image, category, price } = data;
              return (
                <Product
                  key={id}
                  id={id}
                  title={title}
                  image={image}
                  category={category}
                  price={price}
                />
              );
            })}
          {currentCategory !== "all" && <ProductsByCategory />}
        </div>
      </div>
    </div>
  );
};

export default Home;

