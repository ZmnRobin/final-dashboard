"use client";
import React, { useEffect, useState } from "react";
import Card from "../../_components/admin/Card";
import RevenueChart from "../../_components/admin/RevenueChart";
import { revenue } from "@/app/_lib/data/data";
import { getAllOrder } from "@/app/_lib/apiCall/manager/orderApi";
import Loader from "@/app/_components/common/Loader";
import { OrderType } from "@/app/_types/FoodItemTypes";
// import WithAuth from '../../../_components/auth/WithAuth'

function ManagerPage() {
  const [orderList, setOrderList] = useState<OrderType[]>([]); // Initialize userList state
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user list when the component mounts
  const fetchData = async () => {
    setLoading(true);
    try {
      const orders = await getAllOrder();
      console.log(orders);
      setOrderList(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate the number of orders, completed orders, cancelled orders, and total bill
  const totalOrders = orderList.length;
  const completedOrders = orderList.filter(
    (order) => order.status === "completed"
  ).length;
  const cancelledOrders = orderList.filter(
    (order) => order.status === "cancelled"
  ).length;
  const totalBill = orderList.reduce((acc, order) => acc + order.totalBill, 0);

  return (
    <main>
      {loading && <Loader />}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Total Order"
          color="gray"
          value={totalOrders.toString()}
          type="totalOrder"
        />
        <Card
          title="Completed"
          color="green"
          value={completedOrders.toString()}
          type="approved"
        />
        <Card
          title="Cancelled"
          color="red"
          value={cancelledOrders.toString()}
          type="cancelled"
        />
        <Card
          title="Total Bill"
          color="gray"
          value={totalBill.toString()}
          type="totalBill"
        />
      </div>
      <div className="">
        <RevenueChart revenue={revenue} />
      </div>
    </main>
  );
}

export default ManagerPage;
