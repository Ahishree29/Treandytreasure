import React, { useEffect, useRef, useState } from "react";
import Cart from "../Pages/Cart";
import Address from "../Pages/Address";
import Order from "../Pages/Order";
import { HiCheck } from "react-icons/hi";

function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margin, setMargin] = useState({ marginLeft: 0, marginRight: 0 });
  const stepRef = useRef([]);
  const Stepper_steps = [
    {
      name: "Cart",
      Component: () => (
        <Cart handleNext={handleNext} handlePrevious={handlePrevious} />
      ),
    },
    {
      name: "Address",
      Component: () => (
        <Address handleNext={handleNext} handlePrevious={handlePrevious} />
      ),
    },
    {
      name: "Buy",
      Component: () => (
        <Order handleNext={handleNext} handlePrevious={handlePrevious} />
      ),
    },
  ];
  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[Stepper_steps.length - 1].offsetWidth,
    });
  }, [stepRef, Stepper_steps.length]);
  const progressBarWidth =
    ((currentStep - 1) / (Stepper_steps.length - 1)) * 100;

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev === Stepper_steps.length) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };
  const handlePrevious = () => {
    setCurrentStep((prev) => {
      if (prev === 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };
  const ActiveComponent = Stepper_steps[currentStep - 1].Component;

  return (
    <div style={{ position: "relative", zIndex: "10" }} className="py-5 px-2">
      <div className="flex flex-row justify-between relative items-center">
        {Stepper_steps.map((step, index) => (
          <div
            className={`flex flex-col items-center `}
            key={index}
            ref={(el) => (stepRef.current[index] = el)}
          >
            <div
              className={`rounded-full py-1 px-2 text-white flex justify-center items-center z-40 ${
                (currentStep > index + 1 || isComplete) && "bg-green-700"
              } ${currentStep === index + 1 && "bg-pink-800"} ${
                !(currentStep > index + 1 || isComplete) && "bg-pink-400"
              }`}
            >
              {currentStep > index + 1 || isComplete ? <HiCheck /> : index + 1}
            </div>

            <div className="font-sans font-thin">{step.name}</div>
          </div>
        ))}
      </div>
      <div
        className="absolute top-0 left-0 h-1 bg-pink-300 mt-8 "
        style={{
          width: `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
        }}
      >
        <div
          className="h-full bg-green-600 transition-all"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
      </div>

      <ActiveComponent />
    </div>
  );
}

export default Stepper;
