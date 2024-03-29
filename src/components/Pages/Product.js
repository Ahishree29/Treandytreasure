import React, { useEffect, useState } from "react";
import { TrendyState } from "../../context/TrendyProvider";
import ProductCard from "../UI/ProductCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Empty from "./Empty";
import ProductSkeleton from "../UI/ProductSkeleton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function Product() {
  const { user, setCart } = TrendyState();
  const [productSelected, setProductSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ setViewModel] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [searchParams] = useSearchParams();
  const productpage = true;
  const offer = searchParams.get("offer");
  const query = searchParams.get("query");
  const section = searchParams.get("section");
  const productType = searchParams.get("productType");
  const category = searchParams.get("category");
  const limit = 8;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        let apiUrl = "";
        let postData = {};

        if (offer) {
          apiUrl = `/api/product/offer/${offer}?page=${page}&limit=${limit}`;
        } else if (query) {
          apiUrl = `/api/product/${query}?page=${page}&limit=${limit}`;
        } else {
          apiUrl = `/api/product?page=${page}&limit=${limit}`;
        }

        if (apiUrl) {
          postData = {
            productType,
            category,
            section,
          };

          const { data } = await axios.post(apiUrl, postData, config);
          setProductSelected(data.data);
          setTotalProducts(data.nbHits);
          setCart(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          console.log("No valid product API URL found.");
        }
      } catch (err) {
        console.error("Error fetching product data:", err);
        setLoading(false);
      
      }
    };

    getProduct();
  }, [offer, query, section, category, productType, page]); 
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className="px-8 pt-4 flex-col">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-40 ">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : productSelected.length <= 0 ? (
        <div className="flex justify-center items-center">
          <Empty productpage={productpage} />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-40  ">
            {productSelected.map((item, i) => (
              <ProductCard
                key={i}
                item={item}
                setViewModel={setViewModel}
               
              />
            ))}
          </div>
        </div>
      )}
      {productSelected.length > 0 && (
        <div className="flex flex-row justify-center items-center mt-10">
          <span
            className={`bg-pink-400 p-2 text-white ${page <= 1 && "hidden"}`}
            onClick={prevPage}
          >
            <FaAngleLeft />
          </span>

          {[...Array(Math.ceil(totalProducts / limit))].map((_, i) => (
            <div
              key={i}
              className={`px-2 mx-1  font-bold${
                page === i + 1 ? " bg-pink-300 rounded-full text-white" : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </div>
          ))}

          <span
            className={`bg-pink-400 p-2 text-white ${
              page >= totalProducts / limit && "hidden"
            }`}
            onClick={nextPage}
          >
            <FaAngleRight />
          </span>
        </div>
      )}
    </div>
  );
}

export default Product;
