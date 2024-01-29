import { formatDateToLocal } from '@/app/_lib/utils/utilityFunction';
import { OrderType } from '@/app/_types/FoodItemTypes';
import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ViewOrderDetailsProps {
    setOpenOrderDetails: React.Dispatch<React.SetStateAction<boolean>>;
    singleOrder: OrderType;
}

const ViewOrderDetails: React.FC<ViewOrderDetailsProps> = ({ setOpenOrderDetails,singleOrder }) => {
    const handleClose = () => {
      setOpenOrderDetails(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="container flex flex-col py-2 px-3 items-center border shadow-sm bg-white max-w-md">
        <XCircleIcon className='w-5 bg-red-50 hover:cursor-pointer' onClick={handleClose}/>
        <p className="text-2xl font-bold text-center mb-2">FRESH RUSH</p>
        <p className="text-xs mb-2">257/A Matikata Rd, Dhaka 1206</p>
        <p className="text-xs mb-2">Phone: 01797819600</p>

        <div className="text-xs mt-4">
          <p>{formatDateToLocal(singleOrder?.createdAt,"US")}, Time: {" "}</p>
        </div>

        {/* Dynamically render rows based on cart items */}
        <div className="text-xs">
          <div className="flex flex-col">
            <div className="flex flex-row mb-1">
              <div className="w-full">Item Name</div>
              <div className="w-full">Qty</div>
              <div className="w-full">Price</div>
            </div>

            {singleOrder.products?.map((orderedProduct) => (
              <div key={orderedProduct._id} className="flex flex-row mb-1">
                <p className="w-full line-clamp-1 break-words">{orderedProduct.name}</p>
                <p className="w-full">Qty: {orderedProduct.quantity}</p>
                <p className="w-full">Price: {orderedProduct.quantity*orderedProduct.unitPrice}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-2 text-xs">
          <div className="mb-1">
            <p>Discount:</p>
          </div>
          <div className="flex flex-row justify-between mb-1">
            <div>
              <p>Total</p>
            </div>
            <div>{singleOrder?.totalBill}</div>
          </div>
        </div>

        <p className="text-xs text-center mt-2">Thanks for shopping</p>
      </div>
    </div>
  );
}

export default ViewOrderDetails;
