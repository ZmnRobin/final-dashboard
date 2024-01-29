"use client";
import React, { useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import ViewOrderDetails from "./ViewOrderDetails";
import { formatDateToLocal } from "@/app/_lib/utils/utilityFunction";
import { getSingleOrder } from "@/app/_lib/apiCall/manager/orderApi";
import { OrderType } from "@/app/_types/FoodItemTypes";
import Loader from "../common/Loader";

interface OrderTableProps {
  orderList: Array<any>; // Replace 'any' with the specific type of your order objects
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orderList,
  loading,
  setLoading,
}) => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const [singleOrder, setSingleOrder] = useState<OrderType | null>(null);
  console.log("--->",orderList)

  const handleSingleOrder = async (orderId: string) => {
    setLoading(true);
    try {
      const res = await getSingleOrder(orderId);
      setSingleOrder(res);
      // Assuming your component has a state for orderList and a function setOrderList
      setLoading(false);
      setOpenOrderDetails(true);
      console.log(res, singleOrder);
    } catch (error) {
      console.error("Error deleting order:", error);
      // Handle error here (e.g., display error message)
      setLoading(false);
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
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th> */}
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
                    Seller {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(order.createdAt, "US")}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <button className="rounded-md border p-2 hover:bg-gray-100">
                        <EyeIcon
                          className="w-5"
                          onClick={() => handleSingleOrder(order._id)}
                        />
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
