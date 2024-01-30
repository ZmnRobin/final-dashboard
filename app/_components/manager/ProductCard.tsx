import React from "react";
import Image from "next/image";
import TakaSign from "../pos/TakaSign";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ProductCardProps {
  product: {
    _id: string;
    imageUrl: string;
    name: string;
    category: string;
    unitPrice: number;
    stock: number;
  };
  openUpdateModal: (id: string) => void;
  deleteProduct: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  openUpdateModal,
  deleteProduct,
}) => {
  const { imageUrl, name, unitPrice, _id } = product;
  return (
    <div className="bg-white border flex flex-col justify-between border-gray-200 rounded-lg shadow white:bg-gray-800 white:border-gray-700 hover:shadow-xl">
      <div>
        <Image
          className="rounded-t-lg p-3"
          src={imageUrl}
          alt={name}
          width={300}
          height={200}
        />
        <h5 className="m-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black line-clamp-1 break-words">
          {name}
        </h5>
      </div>
      <div className="p-5 flex flex-col justify-end">
        <div className="flex justify-between">
          <div className="flex">
            <TakaSign />
            {unitPrice}
          </div>
          <div className="flex">
            <PencilIcon
              className="w-5 mx-4 hover:cursor-pointer"
              onClick={() => openUpdateModal(_id)}
            />
            <TrashIcon
              className="w-5 hover:cursor-pointer"
              onClick={() => deleteProduct(_id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
