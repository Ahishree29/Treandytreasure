import React, { useEffect, useRef, useState } from "react";
import { HiHome, HiShoppingCart, HiUser } from "react-icons/hi2";
import { HiOutlineMenu } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const modalRef = useRef();

  const [openNav, setOpenNav] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const [profileMenu, setProfileMenu] = useState(false);
  const count = useSelector((state) => state.productSlice.cartCount);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleMenuClick = (event, category) => {
    if (!user) {
      navigate("/login");
    }
    const rect = event.target.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom });
    setShowMenu((prevCategory) => (prevCategory === category ? "" : category));
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowMenu((prevCategory) => prevCategory === "");
        setProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const toggleProfileMenu = () => {
    setProfileMenu((prevProfileMenu) => !prevProfileMenu);
  };
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  const handelOrder = () => {
    if (!user) {
      navigate("/login");
    } else navigate("/MyOrder");
  };
  const handelCart = () => {
    if (!user) {
      navigate("/login");
    } else navigate("/Cart");
  };
  return (
    <div className=" w-screen p-1 shadow-md shadow-pink-900 bg-pink-400 fixed z-50 cursor-pointer ">
      <img
        src="logo.png"
        alt="logo"
        className="w-40"
        onClick={() => navigate("/")}
      />
      <nav className="md:hidden">
        <div className="flex justify-end font-bold text-pink-950 text-4xl">
          <span className="px-3 text-3xl " onClick={() => navigate("/")}>
            <HiHome />
          </span>
          <span className="px-3 text-3xl" onClick={() => navigate("/Cart")}>
            <div className="flex flex-row  ">
              {" "}
              <HiShoppingCart />
              {count > 0 && (
                <span className="bg-red-600  text-base rounded-full h-fit px-2  flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>
          </span>
          <span className="px-3 text-3xl" onClick={toggleProfileMenu}>
            <HiUser />
          </span>

          <h1 className="px-3" onClick={() => setOpenNav(!openNav)}>
            {" "}
            <HiOutlineMenu />
          </h1>
        </div>
        {openNav && (
          <div className="bg-white rounded-md p-3 font-bold text-pink-950 text-xl flex flex-col justify-between mt-8 sm:flex-row ">
            <h1 className="py-3 active:bg-pink-300 " onClick={handelOrder}>
              My Orders
            </h1>

            <h1
              className="py-3 active:bg-pink-300"
              onClick={(e) => handleMenuClick(e, "men")}
            >
              man
            </h1>
            <h1
              className="py-3 active:bg-pink-300"
              onClick={(e) => handleMenuClick(e, "women")}
            >
              women
            </h1>
            <h1
              className="py-3 active:bg-pink-300"
              onClick={(e) => handleMenuClick(e, "kids")}
            >
              kids
            </h1>
          </div>
        )}
      </nav>
      <nav className="hidden md:block">
        <div className="flex flex-row  justify-end font-bold text-pink-100 text-xl  ">
          <h1 className="px-3 " onClick={() => navigate("/")}>
            Home
          </h1>
          <h1 className="px-3 " onClick={(e) => handleMenuClick(e, "men")}>
            man
          </h1>
          <h1 className="px-3 " onClick={(e) => handleMenuClick(e, "women")}>
            women
          </h1>
          <h1 className="px-3" onClick={(e) => handleMenuClick(e, "kids")}>
            kids
          </h1>
          <div className="px-3" onClick={handelOrder}>
            My Orders
          </div>
          <span className="px-3 text-3xl" onClick={handelCart}>
            <div className="flex flex-row  ">
              {" "}
              <HiShoppingCart />
              {count > 0 && (
                <span className="bg-red-600  text-base rounded-full h-fit px-2  flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>
          </span>
          <span className="px-3 text-3xl" onClick={toggleProfileMenu}>
            <HiUser />
          </span>
        </div>
      </nav>
      {showMenu && (
        <div
          className="absolute bg-pink-800 p-2 rounded-md top-full left-0 z-10"
          style={{ top: menuPosition.y, left: menuPosition.x }}
          ref={modalRef}
        >
          {showMenu === "men" && (
            <>
              <Link to={`/Product?productType=clothes&category=men`}>
                <div className="text-white p-3 active:text-pink-500">
                  men's clothes
                </div>
              </Link>
              <Link to={`/Product?productType=accessories&category=men`}>
                <div className="text-white p-3 active:text-pink-500">
                  {" "}
                  men's Accessories
                </div>
              </Link>
            </>
          )}
          {showMenu === "women" && (
            <>
              <Link to={`/Product?productType=clothes&category=women`}>
                <div className="text-white p-3 active:text-pink-500">
                  women's clothes
                </div>
              </Link>
              <Link to={`/Product?productType=accessories&category=women`}>
                <div className="text-white p-3 active:text-pink-500">
                  {" "}
                  women's Accessories
                </div>
              </Link>
            </>
          )}
          {showMenu === "kids" && (
            <>
              <Link
                to={`/Product?productType=clothes&category=kids&section=boy`}
              >
                <div className="text-white p-3 active:text-pink-500">
                  boys's clothes
                </div>
              </Link>
              <Link
                to={`/Product?productType=accessories&category=kids&section=boy`}
              >
                <div className="text-white p-3 active:text-pink-500">
                  {" "}
                  boys's Accessories
                </div>
              </Link>
              <Link
                to={`/Product?productType=clothes&category=kids&section=girl`}
              >
                <div className="text-white p-3 active:text-pink-500">
                  girl's clothes
                </div>
              </Link>
              <Link
                to={`/Product?productType=accessories&category=kids&section=girl`}
              >
                <div className="text-white p-3 active:text-pink-500">
                  {" "}
                  girl's Accessories
                </div>
              </Link>
            </>
          )}
        </div>
      )}
      {profileMenu && (
        <div
          className="absolute bg-pink-800 p-2 rounded-md top-12 right-0 mr-4 mt-20 z-10"
          ref={modalRef}
        >
          {user && (
            <div className="text-white p-2 active:text-pink-500">
              {user.name}
            </div>
          )}
          {!user ? (
            <div
              className="text-white p-2 active:text-pink-500"
              onClick={() => navigate("/login")}
            >
              Log In
            </div>
          ) : (
            <div
              className="text-white p-2 active:text-pink-500"
              onClick={logoutHandler}
            >
              Log Out
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
