import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  siginingIn,
  userEmail,
  userPassword,
  username,
} from "../Redux/signslice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const StyledBox = styled.div`
  background-color: #690759;
  height: 100dvh;
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

function Signin() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const dispatch = useDispatch();

  const [actionSubmit, setActionSubmit] = useState(false);

  function handelSignin(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password doesnt match");
      setPassword("");
      setConfirmPassword("");
      dispatch(siginingIn(true));
    } else {
      setActionSubmit(true);
      dispatch(username(Username));
      dispatch(userEmail(email));
      dispatch(siginingIn(false));
      dispatch(userPassword(password));
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  }
  const paramname = useSelector((store) => store.signslice.name);
  const paramemail = useSelector((store) => store.signslice.email);
  const parampassword = useSelector((store) => store.signslice.password);
  useEffect(
    function () {
      let isMounted = true;
      async function signingin() {
        try {
          if (!paramemail && !paramname && !parampassword) return;
          else {
            const response = await fetch(`http://localhost:5000/api/login/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: paramname,
                email: paramemail,
                password: parampassword,
              }),
            });
            if (response.ok) {
              navigate("/login");
            } else {
              const errorResponse = await response.json();
              toast.error(errorResponse.error);
            }
            if (isMounted) {
              dispatch(username(""));
              dispatch(userEmail(""));
              dispatch(siginingIn(false));
              dispatch(userPassword(""));
            }
          }
        } catch (err) {
          toast.error("An error occurred while signing up.");
        }
      }
      signingin();
      return () => {
        isMounted = false;
      };
    },

    [actionSubmit, paramemail, paramname, parampassword]
  );

  return (
    <StyledBox>
      <StyledForm onSubmit={handelSignin}>
        <StyledLabel>Username: </StyledLabel>
        <StyledInput
          type="text"
          placeholder="Username"
          value={Username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required="this field is required"
        />
        <StyledLabel>Email:</StyledLabel>{" "}
        <StyledInput
          type="email"
          placeholder="abcd@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required="this field is required"
        />
        <StyledLabel>Password:</StyledLabel>{" "}
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required="this field is required"
        />
        <StyledLabel>Confirm Password:</StyledLabel>{" "}
        <StyledInput
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          required="this field is required"
        />
        <StyledButton type="submit">Sign in</StyledButton>
        <StyledLabel>
          already signed in the{" "}
          <Link style={{ color: "black" }} to="/login">
            Login
          </Link>
        </StyledLabel>
      </StyledForm>
    </StyledBox>
  );
}

export default Signin;
