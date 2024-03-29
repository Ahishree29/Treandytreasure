import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import PulseLoader from "react-spinners/PulseLoader";

function SignIn({ setIsLogin }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showConfiremedPassword, setShowConfiremedPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setIsLogin(false);
      toast.error("possword doesn't match");
      return;
    }
    setLoading(true);
    const user = { name: name, email: email, password: password };
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const response = await axios.post("/api/user/", user, config);
      if (response) {
        toast.success("Signin Sucessfull");
        setEmail("");
        setName("");
        setConfirmPassword("");
        setPassword("");
        setLoading(false);
        setIsLogin(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || error.message);
    }
  };
  return (
    <form className="flex flex-col py-10 ">
      <label className=" text-xl py-3">User Name</label>
      <input
        className="p-3 rounded-lg bg-pink-600 text-white font-bold"
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className=" text-xl py-3">Email</label>
      <input
        className="p-3 rounded-lg  bg-pink-600 text-white font-bold"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className=" text-xl py-3">Password</label>
      <div className="flex flex-row">
        <input
          className="p-3 rounded-lg  bg-pink-600 text-white font-bold pr-10"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="bg-pink-600 text-white px-5 rounded-lg ml-1"
          onClick={() => setShowPassword((show) => !show)}
        >
          {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
        </button>
      </div>
      <label className=" text-xl py-3">Confirm Password</label>
      <div className=" flex flex-row">
        <input
          className="p-3 rounded-lg  bg-pink-600 text-white font-bold pr-10"
          type={showConfiremedPassword ? "text" : "password"}
          placeholder="Confirm Your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className=" bg-pink-600 text-white px-5 rounded-lg ml-1"
          onClick={() => setShowConfiremedPassword((show) => !show)}
        >
          {showConfiremedPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
        </button>
      </div>

      <div className="flex justify-center">
        <button
          className=" text-white font-bold rounded-xl  bg-black mt-10 py-2 px-20 "
          onClick={handleSignIn}
          disabled={loading}
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
            "Sign In"
          )}
        </button>
      </div>
    </form>
  );
}

export default SignIn;
