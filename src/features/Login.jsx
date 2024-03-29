import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { siginingIn } from "../Redux/signslice";
import {
  loggedin,
  loginUser,
  loginUserMail,
  loginUserPassword,
  logiuserId,
} from "../Redux/loginslice";
import toast from "react-hot-toast";
import { BaseUrl } from "../helper";

const StyledBox = styled.div`
  background-color: #690759;
  height: auto;
  width: 45rem;
  padding: 20px;
  @media (max-width: 890px) {
    width: 40rem;
  }
  @media (max-width: 750px) {
    width: 35rem;
  }
  @media (max-width: 650px) {
    width: 30rem;
  }
  @media (max-width: 550px) {
    width: 25rem;
  }
  @media (max-width: 550px) {
    width: 15rem;
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
`;
const StyledInput = styled.input`
  height: 3rem;
  width: 25rem;
  margin: 7px;
  background-color: #cfa2c7;
  box-shadow: black;
  border-radius: 10px;
  @media (max-width: 550px) {
    width: 20rem;
  }
  @media (max-width: 550px) {
    width: 15rem;
  }
`;
const StyledLabel = styled.label`
  font-size: 1.5rem;
  color: white;
`;
const StyledButton = styled.button`
  font-size: 1.5rem;
  height: 3rem;
  width: 6rem;
  margin: 10px;
  background-color: black;
  color: white;
  border-radius: 10px;
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");

  const [signIn, setSignIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function handelSubmit(e) {
    e.preventDefault();
    dispatch(loginUserMail(Email));
    dispatch(loginUserPassword(Password));
    loggingin();
  }

  const paramPassword = Password;
  const paramemail = Email;

  async function loggingin() {
    if (!paramemail && !paramPassword) return;
    const response = await fetch(`${BaseUrl}/api/login/logingin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: paramemail,
        password: paramPassword,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setIsAuthenticated(true);

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.name));

        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("userid", JSON.stringify(data.user_id));
      }
      if (data.sucess === true) {
        navigate("/Home");
        dispatch(loggedin(true));
      }
      dispatch(loginUser(data.name));
      dispatch(logiuserId(data.user_id));
    } else {
      const errorResponse = await response.json();
      toast.error(errorResponse.error);
    }
  }

  dispatch(siginingIn(signIn));
  return (
    <StyledBox>
      <StyledForm onSubmit={handelSubmit}>
        <StyledLabel>Email:</StyledLabel>{" "}
        <StyledInput
          type="email"
          placeholder="abcd@gmail.com"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required="this field is required"
        />
        <StyledLabel>Password: </StyledLabel>
        <StyledInput
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required="this field is required"
        />
        <StyledButton type="submit">Login</StyledButton>
        <StyledLabel>
          If you are a new user then{" "}
          <Link style={{ color: "black" }} to="/signin">
            signin
          </Link>
        </StyledLabel>
      </StyledForm>
    </StyledBox>
  );
}

export default Login;
