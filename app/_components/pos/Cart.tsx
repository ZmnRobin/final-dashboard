"use client";
import React, { Fragment, useEffect, useState } from "react";
import { SelectedFoodItemType } from "@/app/_types/FoodItemTypes";
import Image from "next/image";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import PrintPage from "./PrintPage";

export interface CartProps {
  cartItems: SelectedFoodItemType[];
  onIncrease: (itemId: number) => void;
  onDecrease: (itemId: number) => void;
  onDelete: (itemId: number) => void;
}

const Cart = (props: CartProps) => {
  const { cartItems, onIncrease, onDecrease, onDelete } = props;
  const [totalAmount, setTotalAmount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };
  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice = totalPrice + item.quantity * item.unitPrice;
      });
      setTotalAmount(totalPrice);
    };
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <div className="flex flex-col justify-center">
      <h2 className="font-semibold mb-6 text-center">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item._id} className="mb-4">
          <div className="flex items-center justify-between px-2">
            <p className=" text-sm line-clamp-1 break-words">{item.name}</p>
            <div className="flex items-center gap-1">
              <TrashIcon
                onClick={() => onDelete(item._id)}
                className="border-red text-orange-600 w-5 rounded-full p-1 hover:bg-red-200 hover:text-red-800 cursor-pointer"
              />
              <MinusCircleIcon
                className="border-red text-red-600 w-5 hover:text-red-900 cursor-pointer"
                onClick={() => onDecrease(item._id)}
              />
              <span className="mx-2">{item.quantity}</span>
              <PlusCircleIcon
                className="border-red text-green-600 w-5 hover:text-green-900 cursor-pointer"
                onClick={() => onIncrease(item._id)}
              />
            </div>
          </div>
        </div>
      ))}
      {cartItems.length > 0 ? (
        <>
          <hr />
          <span className="text-sm text-slate-600 font-semibold text-center">
            Total Payable Amount:
            {totalAmount}
          </span>{" "}
          <button
            className="mx-auto p-1 rounded bg-blue-600 border text-white mt-4"
            onClick={toggleVisibility}
          >
            {" "}
            Preview{" "}
          </button>
          <div className="mt-3">
            {" "}
            {isVisible && (
              <PrintPage cartItems={cartItems} totalAmount={totalAmount} />
            )}
          </div>
        </>
      ) : (
        <Image
          className="my-auto mx-auto"
          alt="empty cart"
          height={150}
          width={150}
          src={"/images/empty-cart.jpg"}
        />
      )}
    </div>
  );
};

export default Cart;
