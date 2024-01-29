import React, { useState } from "react";
import { Line, Printer, Text, Br, Cut } from "react-thermal-printer";
import InvoiceGenerator from "./InvoiceGenerator";
import { SelectedFoodItemType } from "@/app/_types/FoodItemTypes";
import { createNewOrder } from "@/app/_lib/apiCall/manager/orderApi";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface CartProps {
  cartItems: SelectedFoodItemType[];
  totalAmount: number;
}
const PrintPage: React.FC<CartProps> = (props: CartProps) => {
  const router=useRouter()
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { cartItems, totalAmount } = props;
  const currentDate = new Date();
  const totalPayment = cartItems.reduce(
    (acc, product) => acc + Number(product.unitPrice * product.quantity),
    0
  );
  
  // setTotalAmount(totalPayment);
  const placeOrder=async ()=>{
    setLoading(true)
    const orderData={
      products: cartItems,
      totalBill: totalPayment,
      status: "in progress",
      discount: 0,
    }
      setError('')
      try {
          await createNewOrder(orderData).then(() => {
            setLoading(false) // Fetch updated user list
            toast.success("Order placed successfully.")
            router.push('/seller')
          });

      } catch (error) {
        console.error('Error handling user data:', error);
        setError('An error occurred while creating the new user!');
      }
  }

  return (
    <div className="w-auto">
      <div className="container flex py-2 px-3 justify-center items-center border shadow-sm">
        <Printer
          className="min-w-40"
          type="epson"
          width={42}
          characterSet="korea"
        >
          <Text className="text-2xl font-bold text-center">FRESH RUSH</Text>
          <Text className="mt-2 text-xs">257/A Matikata Rd, Dhaka 1206</Text>
          <Text className="mb-2 text-xs">Phone: 01797819600</Text>

          <Text className="mt-4 text-xs">
            <InvoiceGenerator />
          </Text>
          <Text className="mt-2 justify-between text-xs">
            Date: {currentDate.toLocaleDateString()},Time:{" "}
            {currentDate.toLocaleTimeString()}
          </Text>

          <Br />
          <Line className="h-2" />
          {/* Dynamically render rows based on cart items */}
          {cartItems.length > 0 ? (
            <>
              <div className="text-xs">
                <div className="flex flex-row ">
                  <div className="w-8/12 ">Item Name</div>{" "}
                  <div className="w-2/12">Qty</div>{" "}
                  <div className="w-2/12">Price</div>
                </div>
                <Line className="h-2 mt-2" />
                {cartItems.map((cartProduct, key) => (
                  <div key={key} className="flex flex-row py-1">
                    {" "}
                    <Text className="w-8/12 line-clamp-1 break-words ">
                      {cartProduct.name}
                    </Text>
                    <Text className="w-2/12 pl-1">{cartProduct.quantity}</Text>
                    <Text className="w-2/12">
                      {
                        (cartProduct.unitPrice * cartProduct.quantity)
                      }
                    </Text>
                    {/* <Text>{cartProduct.totalAmount}</Text> */}
                    <Br />
                  </div>
                ))}{" "}
              </div>
              <Line />
              <div className="flex flex-col mr-3 text-xs">
                <div className="flex flex-row justify-between">
                  <p>Discount:</p>
                  <p>0 %</p>
                </div>
                <div className="flex flex-row justify-between">
                  {" "}
                  <div>
                    <p>Total</p>
                  </div>{" "}
                  <div>{totalPayment}</div>{" "}
                </div>

                {/* <Text>Total Payment: ${totalPayment}</Text> */}
              </div>
              <br />
              <Line />
              <p className="text-xs text-center"> Thanks for shopping</p>
            </>
          ) : (
            <Text>No items in the list</Text>
          )}

          <Cut />
        </Printer>
      </div>
      {loading && <Loader/>}
      <div className=" flex justify-between mx-4">
        <button onClick={placeOrder} className="mx-auto border rounded bg-blue-800 text-white text-xl px-3 py-2 hover:scale-95">
          Print
        </button>
      </div>
    </div>
  );
};

export default PrintPage;
