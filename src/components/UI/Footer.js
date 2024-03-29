import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <div className="bg-pink-400 text-pink-200 p-3 flex flex-col justify-between items-center shadow-lg shadow-pink-900 mt-2 md:flex-row ">
      <div>
        <div className=" border-pink-200  w-fit border-b ">
          <img src="./logo.png" alt="logo" className="w-40 mb-2" />
        </div>
        <div className="py-2">
          <a href="mailto:trendytreasure@gmail.com" target="_blank">
            trendytreasure@gmail.com
          </a>
        </div>
      </div>
      <div>
        <div className="font-bold text-lg">Quik Link</div>
        <div onClick={() => navigate("/")}>Home</div>

        <div onClick={() => navigate("/MyOrder")}>My order</div>
        <div onClick={() => navigate("/Cart")}>Cart</div>
      </div>
      <div>
        <div className="flex flex-row p-3">
          <div className="px-1 text-lg">
            {" "}
            <a href="https://www.facebook.com/login.php/" target="_blank">
              <FaFacebookF />
            </a>
          </div>
          <div className="px-1 text-lg">
            <a href="https://www.instagram.com/?hl=en" target="_blank">
              <FaInstagram />
            </a>
          </div>
          <div className="px-1 text-lg">
            <a href="mailto:trendytreasure@gmail.com" target="_blank">
              <IoMdMail />
            </a>{" "}
          </div>
          <div className="px-1 text-lg">
            <a href="https://www.youtube.com/" target="_blank">
              <FaYoutube />
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
