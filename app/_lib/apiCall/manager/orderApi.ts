import api from '../apiInstance';

interface orderData {
    products: any,
    totalBill:number,
    status:string,
    discount: number;
    issuedBy:string |undefined,
    issuedPhone:string | undefined,
    // Add other properties as needed
}

export async function getAllOrder(): Promise<any> {
    try {
      const response = await api.get('/orders');
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
}

export async function createNewOrder(orderData: orderData): Promise<any> {
    try {
      const response = await api.post('/orders', orderData);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error('Failed to new create order');
      }
    } catch (error) {
      throw new Error('Failed to create new order.');
    }
}
export async function getSingleOrder(orderId:string): Promise<any> {
    try {
      const response = await api.get(`/orders/${orderId}`);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error('Failed to fetch single order');
      }
    } catch (error) {
      throw new Error('Failed to fetch single order.');
    }
}
export async function updateSingleOrderStatus(orderId:string,status:string): Promise<any> {
    try {
      const response = await api.patch(`/orders/${orderId}`,{
        status:status
      });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error('Failed to fetch single order');
      }
    } catch (error) {
      throw new Error('Failed to fetch single order.');
    }
}