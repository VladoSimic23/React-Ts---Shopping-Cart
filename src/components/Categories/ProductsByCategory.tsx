import { useAppSelector } from "../../app/hooks";
import { selectProducts } from "../../features/slices/ProductSlice";
import "../../tailwind/tailwind.css";
import Product from "../Products/Product";

const ProductsByCategory = () => {
  const {
    productsState: { products, currentCategory },
  } = useAppSelector(selectProducts);
  return (
    <>
      {products.map((data) => {
        const { id, title, image, category, price } = data;
        if (category === currentCategory) {
          return (
            <Product
              key={id}
              id={id}
              title={title}
              category={category}
              image={image}
              price={price}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default ProductsByCategory;
