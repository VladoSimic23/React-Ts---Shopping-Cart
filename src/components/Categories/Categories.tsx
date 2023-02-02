import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useFetchDB from "../../features/fetchData/useFetchAPI";
import {
  selectProducts,
  setAllCategories,
  setCategory,
} from "../../features/slices/ProductSlice";
import { getAllCategories } from "../../urls";
import Error from "../Error/Error";
import "../../tailwind/tailwind.css";
import { useState, useMemo, useEffect } from "react";
import { capitalizeFirstLetter } from "../../utils";

const Categories = () => {
  const [currentActive, setCurrentActive] = useState(() => {
    if (localStorage.getItem("categoryIndex")) {
      return JSON.parse(localStorage.getItem("categoryIndex") || "");
    }
    return 0;
  });

  const { errorDb, dataDb } = useFetchDB(getAllCategories);
  const data: string[] = dataDb;
  const dispatch = useAppDispatch();
  const {
    productsState: { allCategories },
  } = useAppSelector(selectProducts);
  const memoizedCategories = useMemo(() => allCategories, [allCategories]);

  useEffect(() => {
    const newSetData = ["all", ...data];
    if (memoizedCategories.length < 2) {
      dispatch(setAllCategories(newSetData));
    }
  }, [data, dispatch, memoizedCategories.length]);

  const handleCategory = (category: string, index: number) => {
    localStorage.setItem("categoryIndex", JSON.stringify(index));
    setCurrentActive(index);
    dispatch(setCategory(category));
  };

  if (errorDb) {
    return <Error error={errorDb} />;
  }

  return (
    <div className="lg:col-span-1 p-2 animateOpacity min-[320px]:max-w-md min-[320px]:text-center min-[320px]:mx-auto lg:max-w-full">
      <h3>Categories</h3>
      {memoizedCategories &&
        memoizedCategories.map((category, index) => {
          return (
            <div key={index}>
              <h4
                className={`cursor-pointer p-2 ${
                  currentActive === index && "bg-violet-500 text-white"
                }`}
                onClick={() => handleCategory(category, index)}
              >
                {capitalizeFirstLetter(category)}
              </h4>
            </div>
          );
        })}
    </div>
  );
};

export default Categories;

