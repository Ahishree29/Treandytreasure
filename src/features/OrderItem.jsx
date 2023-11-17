import styled from "styled-components";
import OrderedItems from "./OrderedItems";
const ItemCard = styled.div`
  background-color: #6f3064;
  border-radius: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: grid;

  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: space-around;
  @media (max-width: 1600px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 730px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 550px) {
    width: auto;
  }
`;
const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const OrderDetail = styled.div`
  padding: 5px;
`;
function OrderItem({ order }) {
  const {
    OrderedOn,
    costomerAddress,
    costomerName,
    totalPrice,
    orderNumber,
    cartitem,
  } = order;
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <ItemCard>
      {cartitem.map((item) => (
        <OrderedItems item={item} key={item.id} />
      ))}
      <OrderDetails>
        {" "}
        <OrderDetail>Order Number: {orderNumber}</OrderDetail>
        <OrderDetail>Ordered Date: {formatDate(OrderedOn)}</OrderDetail>
        <OrderDetail>Customers Name: {costomerName}</OrderDetail>
        <OrderDetail>Order Addres: {costomerAddress}</OrderDetail>
        <OrderDetail>Total Price : Rs.{totalPrice}/-</OrderDetail>
      </OrderDetails>
    </ItemCard>
  );
}

export default OrderItem;
