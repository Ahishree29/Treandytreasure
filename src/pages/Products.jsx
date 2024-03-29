import styled from "styled-components";
import ProductCardlayout from "../features/ProductCardlayout";
import ProductSidebar from "../features/ProductSidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EmptyPage from "../ui/EmptyPage";
import Spinner from "../ui/Spinner";
import { BaseUrl } from "../helper";
const Styledlayout = styled.div`
  padding-top: 8rem;
  padding-bottom: 20rem;
  display: grid;
  height: auto;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  @media (max-width: 730px) {
    padding-top: 11rem;
    height: 100vh;
  }
`;
function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const selectedGender = searchParams.get("gender");
  const selectedType = searchParams.get("type");

  useEffect(
    function () {
      async function getdata() {
        try {
          setLoading(true);
          const response = await fetch(
            `${BaseUrl}/api/products/${selectedGender}`
          );
          const data = await response.json();
          const uniqueTypes = new Set();
          data.forEach((element) => {
            uniqueTypes.add(element.type);
          });
          const uniqueTypesArray = Array.from(uniqueTypes);
          setTypes(uniqueTypesArray);

          if (selectedType) {
            setProducts(data.filter((item) => item.type === selectedType));
          } else {
            setProducts(data);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
      getdata();
    },
    [selectedGender, selectedType]
  );

  function handleNavigate() {
    navigate("/");
  }
  if (loading) {
    return <Spinner />;
  }
  if (!products.length)
    return (
      <EmptyPage
        message="No treasures in your cart yet!😥 Swing by again to discover some Trendy Tessure delights"
        onclick={handleNavigate}
      />
    );

  return (
    <Styledlayout>
      <ProductSidebar
        selectedGender={selectedGender}
        products={products}
        types={types}
      />
      <ProductCardlayout products={products} />
    </Styledlayout>
  );
}

export default Products;
