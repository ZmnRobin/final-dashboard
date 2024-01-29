export type FoodItemType = {
  _id: number;
  category: string;
  name: string;
  imageUrl: string;
  stock:number;
  unitPrice:number;
};

export interface SelectedFoodItemType extends FoodItemType {
  totalAmount:number;
  quantity: number;
}

interface ProductType{
  _id: string,
  name:string,
  unitPrice: number,
  quantity: number
}

export interface OrderType {
  products:ProductType[],
  totalBill: number,
  status: string,
  discount: number,
  createdAt: string,
  updatedAt: string,
}
