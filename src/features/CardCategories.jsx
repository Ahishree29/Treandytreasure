import styled from "styled-components";
import Cards from "../ui/Cards";
import { useNavigate } from "react-router-dom";
import { loggedin, loginUser, logiuserId } from "../Redux/loginslice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  height: 100%;
  @media (max-width: 1010px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;

function CardCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const user_id = JSON.parse(localStorage.getItem("userid"));

    if (user && token && user_id) {
      dispatch(loginUser(user));
      dispatch(logiuserId(user_id));
      dispatch(loggedin(true));
      navigate("/Home");
    }
  }, []);
  return (
    <Container>
      <Cards Gender="men" bgColor="#0b4af9" image="./Man.png" />
      <Cards Gender="wemen" bgColor="#ED006c" image="./women.png" />
      <Cards Gender="girl" bgColor="#02CEFC" image="./Girl.png" />
      <Cards Gender="boy" bgColor="#001B7E" image="./Boy.png" />
    </Container>
  );
}

export default CardCategories;
