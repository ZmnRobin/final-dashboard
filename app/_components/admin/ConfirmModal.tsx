import { OrderType } from "@/app/_types/FoodItemTypes";
import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface ConfirmModalProps {
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | any;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  setOpenConfirmModal,
  username,
}) => {
  const handleClose = () => {
    setOpenConfirmModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 overflow-hidden">
      <div className="container flex flex-col rounded py-2 px-3 items-center border shadow-sm bg-white w-2/6 max-h-[75%]  relative h-[calc(100vh_-_10px)] overflow-y-auto no-scrollbar">
        <XCircleIcon
          className="w-7 bg-red-50 hover:cursor-pointer absolute top-0 right-0"
          onClick={handleClose}
        />
        <p className="text-2xl font-bold text-center mb-2">FRESH RUSH</p>
        <p className="text-xs mb-2">257/A Matikata Rd, Dhaka 1206</p>
        <p className="text-xs mb-2">Phone: 01797819600</p>
        <p className="text-sm text-center mt-2">Thanks for shopping</p>
      </div>
    </div>
  );
};

export default ConfirmModal;
