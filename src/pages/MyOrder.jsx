import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../features/OrderItem";
import EmptyPage from "../ui/EmptyPage";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { loggedin, loginUser, logiuserId } from "../Redux/loginslice";
import { BaseUrl } from "../helper";
const OrderStyle = styled.div`
  padding-top: 10rem;
  padding-bottom: 20rem;
  @media (max-width: 730px) {
    padding-top: 14rem;
  }
`;
const OrderHeader = styled.div`
  color: white;
  padding-left: 3rem;
  font-size: 2rem;
  font-weight: bolder;
`;
const OrderCard = styled.div`
  height: auto;
  width: auto;
  color: white;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 550px) {
    height: auto;
    width: auto;
  }
`;

function MyOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.loginslice.userId);
  const [orderedItem, setOrderedItem] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const user_id = JSON.parse(localStorage.getItem("userid"));

    if (user && token && user_id) {
      dispatch(loginUser(user));
      dispatch(logiuserId(user_id));
      dispatch(loggedin(true));
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    async function getOrder() {
      try {
        setLoading(true);
        const response = await fetch(`${BaseUrl}/api/order/${userId}`, {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )} `,
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        setOrderedItem(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    getOrder();
  }, []);

  function handleNavigate() {
    navigate("/cart");
  }
  if (loading) {
    <Spinner />;
  }
  if (!orderedItem.length) {
    return <EmptyPage message="No order yet" onclick={handleNavigate} />;
  }

  return (
    <OrderStyle>
      <OrderHeader>My Orders</OrderHeader>
      <OrderCard>
        {orderedItem.map((order) => (
          <OrderItem order={order} key={order} />
        ))}
      </OrderCard>
    </OrderStyle>
  );
}

export default MyOrder;
