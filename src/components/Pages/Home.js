import React, { useEffect } from "react";
import Slider from "../UI/Slider";
import Corosal from "../UI/Corosal";

import { WomenItem } from "../../Configuration/WomenItem";
import { MenItem } from "../../Configuration/MenItem";
import { KidsItem } from "../../Configuration/KidsItem";
import useCartCount from "../../Hook/useCartCount";

function Home() {
  const { getCartCount } = useCartCount();

  useEffect(() => {
    getCartCount();
  }, [getCartCount]);
  return (
    <>
      <div className="flex flex-row justify-center items-center p-2 ">
        <Slider />
      </div>
      <div className="p-4 ">
        <div className=" font-serif text-2xl font-bold text-pink-700">
          Women's Collection
        </div>
        <Corosal sliderItem={WomenItem} category="women" />
      </div>
      <div className="p-4">
        <div className=" font-serif text-2xl font-bold text-pink-700">
          Men's Collection
        </div>
        <Corosal sliderItem={MenItem} category="men" />
      </div>
      <div className="p-4">
        <div className=" font-serif text-2xl font-bold text-pink-700">
          kid's Collection
        </div>
        <Corosal sliderItem={KidsItem} category="kids" />
      </div>
    </>
  );
}

export default Home;
