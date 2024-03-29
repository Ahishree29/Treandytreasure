import React from "react";

function ProductSkeleton() {
  return (
    <div className="bg-gray-100 px-3 pb-3 rounded-md shadow-md w-fit animate-pulse">
      {" "}
      <div>
        <svg
          className=" text-gray-300"
          style={{ width: "15rem", height: "20rem" }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="flex flex-col  justify-between ">
        <div className="  bg-gray-300 p-2 rounded-md my-3 w-20"></div>
        <div className="  bg-gray-300 p-2 w-full rounded-md my-3"></div>
        <div className="  bg-gray-300 p-2 w-full rounded-md my-3"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
