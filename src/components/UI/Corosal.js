import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import { TrendyState } from "../../context/TrendyProvider";
const responsiveConfig = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Corosal({ sliderItem, category }) {
  const { user } = TrendyState();
  const [imageLoad, setImageLoad] = useState(false);
  useEffect(() => {
    const loadImage = async (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = (error) => reject(error);
        img.src = src;
      });
    };

    const preloadImages = async () => {
      try {
        await Promise.all(sliderItem.map((item) => loadImage(item.image)));
        setImageLoad(true);
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, [sliderItem]);
  return (
    <div className="relative">
      <Carousel showDots={true} responsive={responsiveConfig} className="z-40 ">
        {sliderItem.map((item, index) => (
          <Link
            to={
              user
                ? `/Product?productType=${item.type}&category=${category}&query=${item.query}`
                : "/login"
            }
            key={index}
          >
            {!imageLoad && (
              <Blurhash
                hash={item.hashImg}
                width={500}
                height={400}
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            )}
            {imageLoad && (
              <img key={index} src={item.image} alt="" className="p-1 py-6 " />
            )}
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default Corosal;
