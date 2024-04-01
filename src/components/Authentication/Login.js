import axios from "../../../axiosInstance";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { setId, setUserName } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      setLoading(true);
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const response = await axios.post(
          "/api/user/login",
          { email, password },
          config
        );

        if (response) {
          toast.success("logedin Sucessfull");
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          setEmail("");
          setPassword("");
          setLoading(false);
          dispatch(setUserName(response.data.name));
          dispatch(setId(response.data.id));
        }
        navigate(-1);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message || error.message);
      }
    }
  };
  return (
    <form className="flex flex-col py-10 ">
      <label className=" text-xl py-3">Email</label>

      <input
        className="p-3 rounded-lg bg-pink-600 text-white font-bold"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className=" text-xl py-3">Password</label>
      <div className="flex flex-row">
        <input
          className="p-3 rounded-lg bg-pink-600 text-white font-bold pr-10"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="bg-pink-600 text-white px-5 rounded-lg ml-1"
          onClick={() => setShowPassword((show) => !show)}
        >
          {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
        </button>
      </div>
      <div className="flex justify-center flex-col">
        <button
          className=" text-white font-bold rounded-xl  bg-black mt-10 py-2 px-20"
          onClick={handleLogin}
        >
          {loading ? (
            <PulseLoader
              color={"#e4007c"}
              loading={loading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "LogIn"
          )}
        </button>
        <button className=" text-white font-bold rounded-xl   mt-3 py-2 px-20 bg bg-pink-700">
          Guest User
        </button>
      </div>
    </form>
  );
}

export default Login;
