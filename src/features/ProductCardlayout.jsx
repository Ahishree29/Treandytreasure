import Productcard from "../ui/Productcard";
import styled from "styled-components";
const StyledProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  margin-left: 0 auto;
  gap: 10px;
  width: 100px;
  padding: 2rem;
  padding-left: 20rem;
  @media (max-width: 2000px) {
    padding-left: 20rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 1840px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 0 auto;

    padding-left: 30rem;
  }
  @media (max-width: 1675px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 0 auto;

    padding-left: 25rem;
  }
  @media (max-width: 1430px) {
    padding-left: 20rem;
  }
  @media (max-width: 1430px) {
    padding-left: 15rem;
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
    margin: 0 auto;
    padding-left: 30rem;
  }
  @media (max-width: 1200px) {
    padding-left: 20rem;
  }
  @media (max-width: 875px) {
    padding-left: 18rem;
  }
  @media (max-width: 800px) {
    padding-left: 13rem;
  }
  @media (max-width: 750px) {
    padding-left: 1rem;
  }
  @media (max-width: 700px) {
    padding-left: 0.5rem;
  }
  @media (max-width: 560px) {
    padding-left: 0.1rem;
  }
  @media (max-width: 365px) {
    padding-left: 0;
    padding: 0;
    margin-left: 8rem;
    padding-top: 2rem;
  }
  @media (max-width: 290px) {
    margin-left: 7rem;
  }
`;

function ProductCardlayout({ products }) {
  return (
    <StyledProduct>
      {products.map((product) => (
        <Productcard product={product} key={product.id} />
      ))}
    </StyledProduct>
  );
}

export default ProductCardlayout;
