"use client";
import OrderTable from "@/app/_components/pos/OrderTable";
import { getAllOrder } from "@/app/_lib/apiCall/manager/orderApi";
import { OrderType } from "@/app/_types/FoodItemTypes";
import React, { useEffect, useState } from "react";

export default function OrderPage() {
  const [orderList, setOrderList] = useState<OrderType[]>([]); // Initialize userList state
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user list when the component mounts
  const fetchData = async () => {
    setLoading(true); // Set loading to true before the API call
    try {
      const orders = await getAllOrder();
      setOrderList(orders.reverse());
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error here (e.g., display error message)
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <OrderTable
        orderList={orderList}
        loading={loading}
        setLoading={setLoading}
        fetchData={fetchData}
      />
    </main>
  );
}
