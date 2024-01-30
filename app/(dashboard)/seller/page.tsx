"use client";
import OrderTable from "@/app/_components/pos/OrderTable";
import React, { useEffect, useState } from "react";
import { getAllOrder } from "@/app/_lib/apiCall/manager/orderApi";
import { OrderType } from "@/app/_types/FoodItemTypes";
import { getNameFromCookies } from "@/app/_lib/utils/utilityFunction";

export default function SellerPage() {
  const [orderList, setOrderList] = useState<OrderType[]>([]); // Initialize userList state
  const [loading, setLoading] = useState<boolean>(false);
  const currentUserName = getNameFromCookies();

  // Fetch user list when the component mounts
  const fetchData = async () => {
    setLoading(true); // Set loading to true before the API call
    try {
      let orders = await getAllOrder();
      const newOrder = orders?.filter(
        (order: any) => order.issuedBy === currentUserName
      );
      setOrderList(newOrder.reverse());
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
