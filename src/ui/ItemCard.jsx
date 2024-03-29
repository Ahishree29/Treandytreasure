import styled from "styled-components";
import SizeButtons from "./SizeButtons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isDelete, isSelector, setUpdatedCartdata } from "../Redux/cartslice";
import { HiTrash } from "react-icons/hi";
import { BaseUrl } from "../helper";
const StyledProductCard = styled.div`
  background-color: #6f3064;
  width: 100%;
  max-width: 22rem;
  border-radius: 10px;
  box-shadow: 4px 4px 4px ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  @media (max-width: 530px) {
    max-width: 20rem;
  }
  @media (max-width: 505px) {
    max-width: 18rem;
  }
  @media (max-width: 470px) {
    max-width: 16rem;
  }
  @media (max-width: 400px) {
    max-width: 14rem;
  }

  @media (max-width: 300px) {
    max-width: 12rem;
  }
  @media (max-width: 290px) {
    max-width: 10rem;
  }
  @media (max-width: 280px) {
    max-width: 8rem;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 30rem;
  @media (max-width: 530px) {
    height: 25rem;
  }
  @media (max-width: 300px) {
    height: 20rem;
  }
  @media (max-width: 290px) {
    height: 15rem;
  }
  @media (max-width: 280px) {
    height: 10rem;
  }
`;
const Brandname = styled.h2`
  color: white;
  padding-left: 10px;
`;

const ProductText = styled.p`
  color: white;
  padding-left: 10px;
`;
const Button = styled.button`
  color: white;
  background-color: black;

  display: flex;

  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 6rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  margin-left: 15rem;
  filter: ${(props) => (props.inStock ? "blur(2px)" : "none")};
  @media (max-width: 560px) {
    margin-left: 10rem;
  }
  @media (max-width: 470px) {
    margin-left: 8rem;
  }
  @media (max-width: 450px) {
    margin-left: 6rem;
  }
  @media (max-width: 400px) {
    margin-left: 4rem;
  }
  @media (max-width: 370px) {
    margin-left: 2rem;
  }
  @media (max-width: 290px) {
    margin-left: 1rem;
  }
`;

function ItemCard({
  image,
  brand,
  gender,
  occation,
  fabric,
  color,
  price,
  stock,
  size,
  handelcart,
  type,
  id,
  userId,
  quantity,
}) {
  const [selectedQty, setSelectedQty] = useState(quantity);
  const [inStock, setInStock] = useState(false);
  const qtyOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const dispatch = useDispatch();
  function handleSelect(e) {
    const newQuantity = e.target.value;
    setSelectedQty(newQuantity);
    dispatch(setUpdatedCartdata({ productId: id, newQuantity }));
  }

  useEffect(() => {
    async function updateCart() {
      try {
        const response = await fetch(
          `${BaseUrl}/api/cart/updateQuantity/${userId}/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )} `,
            },
            body: JSON.stringify({ quantity: selectedQty }),
          }
        );

        if (!response.ok) {
          console.error(`Failed to update quantity for product with id ${id}`);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
    updateCart();
  }, [selectedQty]);

  dispatch(isSelector(false));
  useEffect(() => {
    if (stock === 0) {
      setInStock(true);
    }
  }, [stock]);
  const handleDelete = async (productId, userId) => {
    if (
      window.confirm("Are you sure you want to delete this item from the cart?")
    ) {
      try {
        const response = await fetch(
          `${BaseUrl}/api/cart/${userId}/${productId}`,
          {
            method: "DELETE",
            headers: {
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        dispatch(isDelete(true));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  dispatch(isDelete(false));

  return (
    <StyledProductCard>
      <ProductImage src={image} alt="product image" />
      <Brandname>{brand}</Brandname>
      <ProductText>
        {gender}'s {occation} wear {fabric} {type} in {color}
      </ProductText>

      <ProductText>Rs.{price}/-</ProductText>
      {inStock ? (
        <ProductText style={{ color: "red" }}>Out of Stock</ProductText>
      ) : (
        <ProductText>{stock} stocks left</ProductText>
      )}
      {Array.isArray(size) ? (
        <>
          {size.map((itemsize) => (
            <SizeButtons itemsize={itemsize} key={itemsize} />
          ))}
          <Button
            onClick={() => handelcart(id)}
            disabled={inStock}
            inStock={inStock}
          >
            Add to cart
          </Button>
        </>
      ) : (
        <ProductText>
          selected size:{" "}
          <span
            style={{
              borderRadius: "15px",

              fontSize: "20px",
              fontWeight: "bolder",
            }}
          >
            {size.toUpperCase()}
          </span>
          <div>
            <label>Qty</label>
            <select id="Qty" value={selectedQty} onChange={handleSelect}>
              {qtyOptions.map((qty) => (
                <option key={qty}>{qty}</option>
              ))}
            </select>
          </div>
          <div>Total Price {selectedQty * price}</div>
          <Button onClick={() => handleDelete(id, userId)}>
            <HiTrash />
          </Button>
        </ProductText>
      )}
    </StyledProductCard>
  );
}

export default ItemCard;
