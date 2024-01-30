import { formatDateToLocal } from "@/app/_lib/utils/utilityFunction";
import { OrderType } from "@/app/_types/FoodItemTypes";
import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { formatTimeToLocal } from "@/app/_lib/utils/utilityFunction";

interface ViewOrderDetailsProps {
  setOpenOrderDetails: React.Dispatch<React.SetStateAction<boolean>>;
  singleOrder: OrderType;
}

const ViewOrderDetails: React.FC<ViewOrderDetailsProps> = ({
  setOpenOrderDetails,
  singleOrder,
}) => {
  const handleClose = () => {
    setOpenOrderDetails(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
      <div className="container flex flex-col rounded py-2 px-3 items-center border shadow-sm bg-white w-2/6 max-h-[75%]  relative h-[calc(100vh_-_10px)] overflow-y-auto no-scrollbar">
        <XCircleIcon
          className="w-8 bg-red-50 hover:cursor-pointer absolute top-0 right-0"
          onClick={handleClose}
        />
        <p className="text-2xl font-bold text-center mb-2">FRESH RUSH</p>
        <p className="text-xs mb-2">257/A Matikata Rd, Dhaka 1206</p>
        <p className="text-xs mb-2">Phone: 01797819600</p>

        <div className="text-xs mb-3">
          <p>
            {formatDateToLocal(singleOrder?.createdAt, "US")}, Time:{" "}
            {formatTimeToLocal(singleOrder?.createdAt, "US")}{" "}
          </p>
        </div>

        {/* Dynamically render rows based on cart items */}
        <div className="text-sm w-3/4">
          <div className="flex flex-col">
            <div className="flex flex-row mb-1">
              <div className="w-full font-semibold">Item Name</div>
              <div className="w-full font-semibold">Qty</div>
              <div className="w-full font-semibold">Price</div>
            </div>
            <hr />
            {/* Wrap the mapped items in a scrollable container */}
            <div className="overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-gray-300 no-scrollbar">
              {singleOrder.products?.map((orderedProduct) => (
                <div key={orderedProduct._id} className="flex flex-row mb-1">
                  <p className="w-full line-clamp-1 break-words">
                    {orderedProduct.name}
                  </p>
                  <p className="w-full"> {orderedProduct.quantity}</p>
                  <p className="w-full">
                    {orderedProduct.quantity * orderedProduct.unitPrice}
                  </p>
                </div>
              ))}
            </div>
            <hr />
          </div>
        </div>

        <div className="flex flex-col mt-2 text-sm w-3/4">
          <div className="mb-1">
            <p>Discount:</p>
          </div>
          <div className="flex flex-row justify-between mb-1">
            <div>
              <p>Total</p>
            </div>
            <div className="mr-20">{singleOrder?.totalBill}</div>
          </div>
        </div>

        <p className="text-sm text-center mt-2">Thanks for shopping</p>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
