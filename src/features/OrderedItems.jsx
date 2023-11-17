import styled from "styled-components";

const ImageSize = styled.img`
  height: 20rem;
  width: 15rem;
`;
const OrderList = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #510f45;
  height: auto;
  width: 30rem;
  border-radius: 2rem;
`;
const Orderitem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;
const OrderText = styled.div`
  padding: 0.5rem;
`;

function OrderedItems({ item }) {
  const {
    color,
    fabric,
    gender,
    image,
    occation,
    price,
    quantity,
    size,
    stock,
    totalPrice,
    type,
    brand,
  } = item;
  return (
    <OrderList>
      <ImageSize src={image} alt="orderItem" />
      <Orderitem>
        <OrderText>{brand}</OrderText>
        <OrderText>
          {gender}'s {occation} wear {fabric} {type}
        </OrderText>
        <OrderText>Color: {color}</OrderText>
        <OrderText>
          size: <span style={{ fontSize: "Large" }}>{size}</span>
        </OrderText>
        <OrderText>Rs: {price}/-</OrderText>
        <OrderText>QTY: {quantity}</OrderText>
      </Orderitem>
    </OrderList>
  );
}

export default OrderedItems;
