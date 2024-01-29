"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Cart from "./Cart";
import { FoodItemType, SelectedFoodItemType } from "@/app/_types/FoodItemTypes";
import { getAllProduct } from "@/app/_lib/apiCall/manager/productApi";

// export const data: FoodItemType[] = [
//   {
//     _id: 1,
//     title: "Tehari Half ",
//     price: 200,
//     image: "/images/teharihalf.jpg",
//   },
//   {
//     _id: 2,
//     title: "Tehari Full",
//     price: 300,
//     image: "/images/tehari.webp",
//   },
//   {
//     _id: 3,
//     title: "Kacchi Half",
//     price: 300,
//     image: "/images/kacchi half.jpg",
//   },
//   {
//     _id: 4,
//     title: "Kacchi Full",
//     price: 500,
//     image: "/images/kacchi.jpg",
//   },
//   {
//     _id: 5,
//     title: "Morog Polao",
//     price: 200,
//     image: "/images/morog polao.jpg",
//   },
//   {
//     _id: 2,
//     title: "Tehari Full",
//     price: 300,
//     image: "/images/tehari.webp",
//   },
//   {
//     _id: 3,
//     title: "Kacchi Half",
//     price: 300,
//     image: "/images/kacchi half.jpg",
//   },
//   {
//     _id: 4,
//     title: "Kacchi Full",
//     price: 500,
//     image: "/images/kacchi.jpg",
//   },
//   {
//     _id: 5,
//     title: "Morog Polao",
//     price: 200,
//     image: "/images/morog polao.jpg",
//   },
//   {
//     _id: 2,
//     title: "Tehari Full",
//     price: 300,
//     image: "/images/tehari.webp",
//   },
//   {
//     _id: 3,
//     title: "Kacchi Half",
//     price: 300,
//     image: "/images/kacchi half.jpg",
//   },
//   {
//     _id: 4,
//     title: "Kacchi Full",
//     price: 500,
//     image: "/images/kacchi.jpg",
//   },
//   {
//     _id: 5,
//     title: "Morog Polao",
//     price: 200,
//     image: "/images/morog polao.jpg",
//   },
// ];



const Pos: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productList, setProductList] = useState<FoodItemType[]>([]);
  const [cartItems, setCartItems] = useState<SelectedFoodItemType[]>([]);
  const [updateProductId, setUpdateProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const products = await getAllProduct();
      setProductList(products);
      console.log(products,productList)

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (foodItem: FoodItemType) => {
    let newFoodItem={
      _id: foodItem?._id,
      name: foodItem?.name,
      unitPrice: foodItem?.unitPrice,
      quantity: foodItem?.quantity,
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === newFoodItem._id
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...newFoodItem, quantity: 1 }]);
    }
  };

  const increaseQuantity = (itemId: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === itemId
        ? { ...item, quantity: item.quantity + 1}
        : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (itemId: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1}
        : item
    );
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (itemId: number) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="flex flex-row gap-2 divide-x-2 border">
      <div className="w-8/12 h-[calc(100vh_-_50px)] overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-3 gap-1">
          {productList?.map((food) => (
            <Card
              key={food._id}
              {...food}
              onAddToCart={() => addToCart(food)}
            />
          ))}
        </div>
      </div>
      <div className="w-4/12">
        <Cart
          cartItems={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onDelete={removeFromCart}
        />
      </div>
    </div>
  );
};

export default Pos;
