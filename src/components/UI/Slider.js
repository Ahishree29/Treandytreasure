import React, { useEffect, useRef, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { TrendyState } from "../../context/TrendyProvider";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import { featuredProducts } from "../../Configuration/FeaturedProducts";

let slideInterval;
function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoad, setImageLoad] = useState(false);
  const { user } = TrendyState();
  const sliderRef = useRef();
  const requestAnimation = () => {
    sliderRef.current.classList.remove("fade-anim");
  };
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoad(true);
    };
    img.src = featuredProducts[currentIndex].image;
  }, [featuredProducts[currentIndex].image]);
  useEffect(() => {
    sliderRef.current.addEventListener("animationend", requestAnimation);
    sliderRef.current.addEventListener("mouseenter", pauseSlider);
    sliderRef.current.addEventListener("mouseleave", startSlider);
    startSlider();
    return () => {
      pauseSlider();
    };
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };
  const pauseSlider = () => {
    clearInterval(slideInterval);
  };
  const handleOnNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    sliderRef.current.classList.add("fade-anim");
  };

  const handleOnPreviousClick = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + featuredProducts.length) % featuredProducts.length
    );
  };

  return (
    <div
      className="select-none relative flex justify-center  w-full "
      ref={sliderRef}
    >
      <Link
        to={
          user
            ? `/Product?productType=${featuredProducts[currentIndex].productCategory}&category=${featuredProducts[currentIndex].category}&offer=${featuredProducts[currentIndex].offer}`
            : "/login"
        }
      >
        <div className="aspect-w-16 aspect-h-9">
          {!imageLoad && (
            <Blurhash
              hash={featuredProducts[currentIndex].hashImg}
              width={1500}
              height={500}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          )}
          {imageLoad && (
            <img src={featuredProducts[currentIndex].image} alt="" />
          )}
        </div>
      </Link>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between">
        <button
          onClick={handleOnPreviousClick}
          className="font-bold text-lg text-white bg-pink-900 rounded-full p-1"
        >
          <HiOutlineChevronLeft />
        </button>
        <button
          onClick={handleOnNextClick}
          className="font-bold text-lg text-white bg-pink-900 rounded-full p-1"
        >
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Slider;
