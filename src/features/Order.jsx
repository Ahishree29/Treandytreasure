import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const OrderIcon = styled.div`
  color: white;
  padding: 5px;
  margin-right: 10px;
  font-size: 29px;
`;
function Order() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/myorder");
  }
  return (
    <OrderIcon onClick={handleClick}>
      <FaShoppingBag />
    </OrderIcon>
  );
}

export default Order;
