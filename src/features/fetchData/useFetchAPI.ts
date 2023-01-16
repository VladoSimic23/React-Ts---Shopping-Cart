import { useEffect, useState } from "react";
import { ProductsI } from "../../interface/interface";

const useFetchDB = (url: string) => {
  const [dataDb, setDataDb] = useState<any>([]);
  const [errorDb, setErrorDb] = useState<string>("");
  const [loadingDb, setLoadingDb] = useState<boolean>(false);

  useEffect(() => {
    setLoadingDb(true);
    const fetchData = async () => {
      try {
        const res: Response = await fetch(url);
        const data: ProductsI[] = await res.json();
        setDataDb(data);
        setLoadingDb(false);
      } catch (error: any) {
        console.log(error.message);
        setErrorDb(error.message);
      }
    };
    fetchData();
  }, [url]);

  return { dataDb, errorDb, loadingDb };
};

export default useFetchDB;
