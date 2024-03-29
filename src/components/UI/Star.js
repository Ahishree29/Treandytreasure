import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Star({ rating, setRating }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-row py-1 pb-2  items-center">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <div key={index} className="flex items-center p-1 ">
            <FaStar
              className={`cursor-pointer text-2xl ${
                currentRating <= (hover || rating)
                  ? "text-pink-900"
                  : "text-pink-300"
              }`}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(currentRating)}
            />
          </div>
        );
      })}
      <p className="px-2">
        Rating : <span className=" font-bold text-lg">{rating}</span>
      </p>
    </div>
  );
}

export default Star;
