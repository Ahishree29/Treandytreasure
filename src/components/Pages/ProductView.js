import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiArrowSmLeft, HiOutlineShare } from "react-icons/hi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { getDiscountPrice, getOffer } from "../../helper/getDiscountPrice";
import { getTimeAgo } from "../../helper/getTimeAgo";
import Star from "../UI/Star";
import { TrendyState } from "../../context/TrendyProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../redux/productSlice";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { ShareImage } from "react-share";
function ProductView() {
  const dispatch = useDispatch();
  const { user, setCart } = TrendyState();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("ProductId");
  const [review, setReview] = useState("");
  const [post, setPost] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedSize, setSelectedSize] = useState();
  const [shareModel, setShareModel] = useState(false);
  const shareUrl = window.location.href;
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `/api/product/productbyId/${id}`,
          config
        );
        setSelectedItem(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [post]);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <PulseLoader
          color={"#e4007c"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!selectedItem) {
    return <div>No data found.</div>;
  }

  const handleReview = async () => {
    if (!user.token) {
      navigate("/login");
    }
    if (!rating) {
      toast.error("please rate the product");
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.post(
        "/api/comment/",
        { rating, review, productId: id },
        config
      );
      if (response) {
        toast.success("comment posted successfully");
        setPost(true);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleCart = async () => {
    if (!user.token) {
      navigate("/login");
    }
    if (selectedItem.size.length > 0) {
      if (!selectedSize) {
        toast.error("please select the size");
        return;
      }
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.post(
        "/api/cart/",
        { productId: id, size: selectedSize, quantity: 0 },
        config
      );
      if (response) {
        toast.success("product added to cart succesfully");
        navigate("/Cart");
        dispatch(setCartCount((count) => count + 1));

        setCart(true);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      console.error("Error while adding to cart:", error);
    }
  };

  const handleMenuClick = (event) => {
    setShareModel((share) => !share);
    const rect = event.target.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom });
    setShowMenu((prevCategory) => (prevCategory === category ? "" : category));
  };
  const {
    image,
    section,
    brand,
    category,
    color,
    fabric,
    item_type,
    item_category,
    occasion,
    price,
    offer,
    size,
    comment,
  } = selectedItem;
  return (
    selectedItem && (
      <>
        <div className="  bg-pink-100 p-8    flex  flex-col z-50 max-h-screen overflow-y-auto">
          <div className="flex flex-row justify-between">
            <div
              onClick={() => navigate(-1)}
              className="font-bold text-2xl flex flex-row items-center text-pink-800 "
            >
              <HiArrowSmLeft />
              <snap className="font-bold text-sm"> Back</snap>
            </div>
            <div
              className="font-bold text-2xl flex flex-row items-center text-pink-800 "
              onClick={handleMenuClick}
            >
              <HiOutlineShare />
            </div>
          </div>
          {shareModel && (
            <div
              style={{ top: menuPosition.y, left: menuPosition.x - 25 }}
              className="absolute bg-pink-800 p-2 rounded-md top-full  z-10 mr-80 "
            >
              <EmailShareButton
                url={shareUrl}
                subject={`Look at this amazing discovery I stumbled upon in Trendy Treasure!`}
                body={`${category}'s ${item_type} from trendy tressure collection`}
              >
                <EmailIcon />
              </EmailShareButton>
              <WhatsappShareButton
                url={shareUrl}
              
                title="Look at this amazing discovery I stumbled upon in Trendy Treasure!"
              >
                <WhatsappIcon />
              </WhatsappShareButton>
              <FacebookShareButton url={shareUrl} hashtag="trendy treasure">
                <FacebookIcon />
              </FacebookShareButton>
            </div>
          )}
          <div className="flex  flex-col  lg:flex-row justify-center items-center lg:justify-start">
            <div>
              <img src={image} alt="product" style={{ height: "40rem" }} />
            </div>
            <div className="py-5 lg:px-10">
              <div className="flex flex-row justify-between">
                <h1 className=" font-bold text-lg font-serif">
                  {brand.toUpperCase()}
                </h1>
                {comment.length > 0 &&
                  comment.map((c, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-center items-center bg-yellow-500 rounded-xl px-2 "
                    >
                      <FaStar className="mx-1 text-pink-800" />{" "}
                      {c.comment.reduce((acc, r) => acc + r.rate, 0) /
                        c.comment.length}
                    </div>
                  ))}
              </div>
              <h2 className=" font-thin">
                {category}{" "}
                {color.map((c, index) => (
                  <React.Fragment key={index}>
                    {c}
                    {index !== color.length - 1 ? ", " : " "}
                  </React.Fragment>
                ))}
                {occasion.map((o, index) => (
                  <React.Fragment key={index}>
                    {o}
                    {index !== color.length - 1
                      ? " "
                      : `${index !== color.length - 2 ? " and " : " "}`}
                  </React.Fragment>
                ))}
                {item_type}
              </h2>

              <div className="flex flex-row  ">
                <div className=" font-extralight  flex justify-center items-center">
                  MRP{" "}
                </div>{" "}
                <div
                  className={`${
                    offer ? "line-through" : ""
                  } flex justify-center items-center`}
                >
                  {" "}
                  <LiaRupeeSignSolid />
                  {price}
                </div>
                {offer && (
                  <>
                    <div className="flex justify-center items-center">
                      {" "}
                      <LiaRupeeSignSolid />
                      {getDiscountPrice(price, offer)}
                    </div>
                    <div className="bg-pink-700 p-1 m-1 rounded-full text-white">
                      {" "}
                      {getOffer(offer)}% offer
                    </div>
                  </>
                )}
              </div>
              {size && (
                <div className="flex flex-row  pt-4 ">
                  {size.map((s, i) => (
                    <div
                      key={i}
                      className={` mr-10 border border-pink-800 text-pink-800 p-2 ${
                        selectedSize === s ? "bg-pink-800 text-white" : ""
                      }`}
                      onClick={() => {
                        setSelectedSize(s);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col">
                <h1 className=" font-extrabold text-xl py-3">
                  {" "}
                  Product Details
                </h1>
                <div>
                  Brand Name : {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </div>
                <div>
                  Product Type :{" "}
                  {item_type.charAt(0).toUpperCase() + item_type.slice(1)}
                </div>
                {showMore && (
                  <>
                    <div>Section : {category}</div>
                    {section && <div>sub Section : {section}</div>}
                    <div>
                      Fabric :{" "}
                      {fabric.charAt(0).toUpperCase() + fabric.slice(1)}
                    </div>
                    <div>
                      Color :{" "}
                      {color.map((c, index) => (
                        <React.Fragment key={index}>
                          {c}
                          {index !== color.length - 1 ? ", " : " "}
                        </React.Fragment>
                      ))}
                    </div>
                    <div>
                      Occasion :{" "}
                      {occasion.map((c, index) => (
                        <React.Fragment key={index}>
                          {c}
                          {index !== occasion.length - 1 ? ", " : " "}
                        </React.Fragment>
                      ))}
                    </div>
                    <div>Product Category : {item_category}</div>
                  </>
                )}
                {!showMore ? (
                  <button
                    className="text-pink-800 font-bold"
                    onClick={() => setShowMore(true)}
                  >
                    Read more...
                  </button>
                ) : (
                  <button
                    className="text-pink-800 font-bold"
                    onClick={() => setShowMore(false)}
                  >
                    Read less...
                  </button>
                )}
              </div>
              <div className="flex flex-col p-3">
                <button
                  className="bg-pink-800 rounded-md text-white p-3 m-1"
                  onClick={handleCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className=" border border-pink-300 p-5 my-2 ">
              <div className="font-bold pb-3">comment section</div>
              {comment?.map((c) =>
                c.comment.map((com) => (
                  <div className="border-b border-gray-300 my-2 py-2">
                    <div
                      className={`${
                        com.rate === 5
                          ? "bg-green-600"
                          : com.rate === 4
                          ? "bg-yellow-500"
                          : "bg-red-700"
                      } py-1 px-2  flex flex-row w-fit justify-center items-center`}
                    >
                      {com.rate}
                      <FaStar className="mx-1 text-pink-400" />
                    </div>
                    <div className="px-2 font-thin">
                      {getTimeAgo(c.createdAt)}
                    </div>
                    <div className="py-2">{com.feedback}</div>
                    <div className="Py-3 font-light">{com.userName}</div>
                  </div>
                ))
              )}
            </div>
            <div className="border border-pink-900 p-3 flex-wrap">
              <h1 className="font-bold pb-1">Rate the Product</h1>
              <Star rating={rating} setRating={setRating} />
              <h1 className="font-bold pb-1">Add Comment</h1>
              <textarea
                className="p-3 rounded-md w-full"
                placeholder="Write a comment"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <button
                className="bg-black p-2 px-4 flex  text-white rounded-md my-2"
                onClick={handleReview}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ProductView;
