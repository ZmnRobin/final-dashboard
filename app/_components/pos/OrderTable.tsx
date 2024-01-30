"use client";
import React, { useEffect, useState } from "react";
import { EyeIcon, XMarkIcon, CheckIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import ViewOrderDetails from "./ViewOrderDetails";
import {
  formatDateToLocal,
  formatTimeToLocal,
} from "@/app/_lib/utils/utilityFunction";
import {
  getSingleOrder,
  updateSingleOrderStatus,
} from "@/app/_lib/apiCall/manager/orderApi";
import { OrderType } from "@/app/_types/FoodItemTypes";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

interface OrderTableProps {
  orderList: Array<any>; // Replace 'any' with the specific type of your order objects
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => {};
}

const OrderTable: React.FC<OrderTableProps> = ({
  orderList,
  loading,
  setLoading,
  fetchData,
}) => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const [singleOrder, setSingleOrder] = useState<OrderType | null>(null);
  const [status, setStatus] = useState(false);

  const handleSingleOrder = async (orderId: string) => {
    setLoading(true);
    try {
      const res = await getSingleOrder(orderId);
      setSingleOrder(res);
      setLoading(false);
      setOpenOrderDetails(true);
    } catch (error) {
      console.error("Error fetching single order:", error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setLoading(true);
    try {
      // Call the updateSingleOrderStatus function
      await updateSingleOrderStatus(orderId, status).then(() => {
        fetchData();
        setLoading(false); // Fetch updated user list
        status === "completed"
          ? toast.success(`Order is ${status}.`, { duration: 1000 })
          : toast.error(`Order is ${status}.`, { duration: 1000 });
      });
      // Update the local orderList or fetch the updated orderList
      // Assuming you have a function setOrderList to update the orderList
      // const updatedOrderList = await fetchOrderList(); // replace with your actual function
      // setOrderList(updatedOrderList);
    } catch (error) {
      console.error("Error updating order status:", error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in progress":
        return "text-yellow-500"; // yellow color for in progress
      case "completed":
        return "text-green-500"; // green color for completed
      case "cancelled":
        return "text-red-500"; // red color for cancelled
      default:
        return "text-gray-500"; // default color for other statuses
    }
  };

  return (
    <div className="mt-6 flow-root">
      {loading && <Loader />}
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Order No.
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Issued By
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creation Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creation Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-center">
                  Actions
                </th>
              </tr>
            </thead>
            {/* {loading ? (<Loader/>):( */}
            <tbody className="bg-white">
              {orderList?.map((order: any, index: number) => (
                <tr
                  key={order._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/human.jpg"
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt="profile picture"
                      />
                      <p>{index + 1}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.issuedBy}
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-3 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(order.createdAt, "US")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTimeToLocal(order?.createdAt, "US")}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center">
                    <div className="flex justify-end gap-3">
                      <button className="group rounded-md border p-2 hover:bg-gray-100 relative">
                        <EyeIcon
                          className="w-5"
                          onClick={() => handleSingleOrder(order._id)}
                        />
                        <span className="invisible group-hover:visible absolute top-[-30px] left-[-30px] bg-gray-500 text-white p-1 rounded-md">
                          View Order Details
                        </span>
                      </button>
                      <button
                        className="group rounded-md border p-2 bg-red-100 hover:bg-red-300 relative"
                        disabled={order.status !== "in progress"}
                      >
                        <XMarkIcon
                          onClick={(e) =>
                            updateOrderStatus(order._id, "cancelled")
                          }
                          className="w-5 text-red-700"
                        />
                        <span className="invisible group-hover:visible absolute top-[-30px] left-[-30px] bg-red-500 text-white p-1 rounded-md">
                          Cancel Order
                        </span>
                      </button>

                      <button
                        className={
                          order.status !== "in progress" &&
                          order.status === "completed"
                            ? "group rounded-md border p-2 bg-gray-300 relative"
                            : "group rounded-md border p-2 bg-green-300 relative"
                        }
                        disabled={order.status !== "in progress"}
                      >
                        <CheckIcon
                          className={"w-5 text-green-700"}
                          onClick={(e) =>
                            updateOrderStatus(order._id, "completed")
                          }
                        />
                        {order.status === "in progress" && (
                          <span className="invisible group-hover:visible absolute top-[-30px] left-[-30px] bg-green-500 text-white p-1 rounded-md">
                            Accept Order
                          </span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* )} */}
          </table>
        </div>
      </div>
      {openOrderDetails && (
        <ViewOrderDetails
          setOpenOrderDetails={setOpenOrderDetails}
          singleOrder={singleOrder}
        />
      )}
    </div>
  );
};
export default OrderTable;
