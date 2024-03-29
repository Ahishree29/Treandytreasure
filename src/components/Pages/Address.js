import React, { useEffect, useState } from "react";
import {
  HiOutlineArrowSmLeft,
  HiOutlineX,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import { TrendyState } from "../../context/TrendyProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Address({ handleNext, handlePrevious }) {
  const { user } = TrendyState();
  const [deleveryAddress, setDeleveryAddres] = useState();
  const [name, setName] = useState();

  const [addAddress, setAddAddress] = useState(false);
  const [mobileNum, setMobileNum] = useState();
  const [pinCode, setPinCode] = useState();
  const [address, setAddress] = useState();
  const [town, setTown] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const [idToBeUpdate, setIdToBeUpdate] = useState(0);
  const [updateAddress, setUpdateAddress] = useState(false);
  useEffect(() => {
    const getAddress = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get("/api/address/", config);
        if (response && response.data) {
          setDeleveryAddres(response.data); 
          setIsDeleted(false);
          setIsAdded(false);
          setIsSelected(false);
        }
      } catch (error) {
       
        console.error("Error fetching delivery address:", error);
      }
    };
    getAddress();
  }, [isDeleted, isAdded, isSelected]);
  const handleAddAddress = async (e) => {
    e.preventDefault();
    const newAddress = {
      name: name,
      mobileNum: mobileNum,
      pinCode: pinCode,
      address: address,
      town: town,
      city: city,
      state: state,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.post("/api/address/", newAddress, config);
      if (response && response.data) {
        setIsAdded(true);
        toast.success("address added successfully");
        setName("");
        setMobileNum("");
        setPinCode("");
        setAddress("");
        setTown("");
        setCity("");
        setState("");
        setAddAddress(false);
      }
    } catch (error) {
    
      console.error("Error fetching delivery address:", error);
      toast.error("Error fetching delivery address");
    }
  };
  const handleDelete = async (addressId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.delete(`/api/address/${addressId}`, config);
      if (response) {
        setIsDeleted(true);
        toast.success("deleted succesfully"); 
      }
    } catch (error) {
   
      console.error("Error fetching delivery address:", error);
    }
  };
  const handleUpdate = async (id, e) => {
    e.preventDefault();
    const updateAddress = {
      name: name,
      mobileNum: mobileNum,
      pinCode: pinCode,
      address: address,
      town: town,
      city: city,
      state: state,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.put(
        `/api/address/${id}`,
        updateAddress,
        config
      );
      if (response) {
        setIsAdded(true);
        toast.success("updated succesfully"); 
        setUpdateAddress(false);
      }
    } catch (error) {
      
      console.error("Error fetching delivery address:", error);
    }
  };
  const addressUpdate = (id) => {
    const addressToUpdate = deleveryAddress.find(
      (address) => address._id === id
    );
    if (addressToUpdate) {
      setIdToBeUpdate(addressToUpdate._id);
      setName(addressToUpdate.name);
      setMobileNum(addressToUpdate.mobileNum);
      setPinCode(addressToUpdate.pinCode);
      setAddress(addressToUpdate.address);
      setTown(addressToUpdate.town);
      setCity(addressToUpdate.city);
      setState(addressToUpdate.state);
      setUpdateAddress(true);
      setAddAddress(false);
    }
  };
  const handleCancle = (e) => {
    e.preventDefault();
    setAddAddress(false);
    setUpdateAddress(false);
  };
  const addressAdd = () => {
    setName("");
    setMobileNum("");
    setPinCode("");
    setAddress("");
    setTown("");
    setCity("");
    setState("");
    setAddAddress(true);
    setUpdateAddress(false);
  };
  const handleSelectedAddress = async (addressId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.put(
        `/api/address/select/${addressId}`,
        {},
        
        config
      );
      if (response && response.data) {
       
        setIsSelected(true);
      }
    } catch (error) {

      console.error("Error fetching delivery address:", error);
    }
  };
  const handleproceed = () => {
    if (deleveryAddress) {
      const selected = deleveryAddress.find((ads) => ads.isSelected === true);
      if (!selected) {
        toast.error("please select a valid address");
      } else {
        return handleNext();
      }
    }
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center border shadow-lg shadoe-pink-400 p-2 w-full mt-7">
        <div className="flex flex-row">
          <button onClick={handlePrevious} className="font-bold text-lg px-2">
            <HiOutlineArrowSmLeft />
          </button>
          <h1 className="font-bold text-lg font-serif">Address</h1>
        </div>
        <button
          className="bg-pink-800 text-white p-2 rounded-md font-semibold text-xl font-serif"
          onClick={handleproceed}
        >
          Proceed
        </button>
      </div>
      <div className="border border-pink-700 p-5 m-2 rounded-md flex justify-center items-center  flex-col">
        <div className="flex flex-col w-full">
          {deleveryAddress &&
            deleveryAddress.map((ads, index) => (
              <div
                key={index}
                className=" font-sans flex flex-row justify-between items-center w-full border border-black p-5 m-2 rounded-md    "
              >
                <div className="flex flex-row">
                  <div className="px-4">
                    <input
                      type="checkbox"
                      onChange={() => handleSelectedAddress(ads._id)}
                      checked={ads.isSelected}
                    />
                  </div>
                  <div>
                    <p>{ads.name}</p>
                    <p>{ads.mobileNum}</p>
                    <p>{ads.address}</p>
                    <p>{ads.pinCode}</p>
                    <p>{ads.town}</p>
                    <p>{ads.city}</p>
                    <p>{ads.state}</p>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <button
                    className="border p-2 border-black mr-2"
                    onClick={() => handleDelete(ads._id)}
                  >
                    <HiTrash />
                  </button>
                  <button
                    className="border p-2 border-black"
                    onClick={() => addressUpdate(ads._id)}
                  >
                    <HiPencil />
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className=" font-serif font-semibold text-base">
          Add delevery address{" "}
          <button
            className=" bg-pink-700 text-white p-2 shadow-sm shadow-pink-400 rounded-md px-3"
            onClick={addressAdd}
          >
            Add Address
          </button>
        </div>
      </div>
      {(addAddress || updateAddress) && (
        <div>
          <form className="m-8 border border-pink-500 shadow-sm shadow-pink-400 rounded-md">
            <button
              onClick={(e) => handleCancle(e)}
              className="flex justify-end text-pink-700 text-xl font-bold p-2"
            >
              <HiOutlineX />
            </button>
            <div className="m-2 border border-black p-3 rounded-md flex flex-col">
              <h1 className="p-2 text-pink-700 text-lg font-medium">
                Contact Details
              </h1>

              <input
                placeholder="Name*"
                className="p-3 m-1 border border-pink-500 rounded-md"
                required
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <input
                placeholder="Mobile No*"
                className="p-3 m-1 border border-pink-500 rounded-md"
                required
                type="text"
                onChange={(e) => setMobileNum(e.target.value)}
                value={mobileNum}
              />
            </div>
            <div className="m-2 border border-black p-3 rounded-md flex flex-col">
              <h className="p-2 text-pink-700 text-lg font-medium">Address</h>

              <input
                placeholder="Pin Code*"
                className="p-3 m-1 border border-pink-500 rounded-md"
                required
                type="text"
                onChange={(e) => setPinCode(e.target.value)}
                value={pinCode}
              />
              <input
                placeholder="Address(House No, Building,street,Area)*"
                className="p-3 m-1 border border-pink-500 rounded-md"
                required
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <input
                placeholder="Locality/Twon*"
                className="p-3 m-1 border border-pink-500 rounded-md"
                required
                type="text"
                onChange={(e) => setTown(e.target.value)}
                value={town}
              />
              <div className="flex flex-col lg:flex-row">
                <input
                  placeholder="City/District*"
                  className="p-3 m-1 border border-pink-500 rounded-md"
                  required
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
                <input
                  placeholder="state*"
                  className="p-3 m-1 border border-pink-500 rounded-md"
                  required
                  type="text"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-black text-white p-2 rounded-md m-3 flex justify-center items-center"
                onClick={(e) => handleCancle(e)}
              >
                cancle
              </button>
              {updateAddress && (
                <button
                  className="bg-pink-700 p-2 rounded-md m-3 flex justify-center items-center"
                  onClick={(e) => handleUpdate(idToBeUpdate, e)}
                >
                  Update
                </button>
              )}
              {addAddress && (
                <button
                  className="bg-pink-700 p-2 rounded-md m-3 flex justify-center items-center"
                  onClick={handleAddAddress}
                >
                  Save
                </button>
              )}
            </div>
          </form>
          <button onClick={handleNext}>next</button>
        </div>
      )}
    </>
  );
}

export default Address;
