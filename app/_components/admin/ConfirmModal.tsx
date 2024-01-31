import { OrderType } from "@/app/_types/FoodItemTypes";
import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface ConfirmModalProps {
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | any;
  handleDeleteUser: void;
  userId: string | any;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  setOpenConfirmModal,
  username,
  userId,
  handleDeleteUser,
}) => {
  const handleClose = () => {
    setOpenConfirmModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 overflow-hidden">
      <div className="flex flex-col justify-between bg-white h-2/6 w-2/6 items-end rounded px-3">
        <div className="mx-auto my-6 text-xl font-semibold text-red-600">
          Are You Sure You Want to Delete {username} ?
        </div>
        <div className="flex flex-row gap-4 mr-3 mb-4">
          <button
            onClick={handleClose}
            className="border text-white rounded bg-red-400 px-3 py-2 text-base hover:bg-red-500"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteUser(userId, username)}
            className="border text-white rounded bg-green-400 px-3 py-2 text-base hover:bg-green-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
