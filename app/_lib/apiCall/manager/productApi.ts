import api from '../apiInstance';

interface productData {
    imageUrl:string;
    name: string;
    category:string;
    unitPrice: number;
    stock: number; // Assuming creationDate is a string for now
  }

export async function getAllProduct(): Promise<any> {
  try {
    const response = await api.get('/products');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function createProduct(productData: productData): Promise<any> {
    console.log(productData)
  try {
    const response = await api.post('/products', productData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

export async function deleteSingleProduct(id: string): Promise<any> {
  try {
    const response = await api.delete(`/products/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}

export async function findSingleProduct(id: string): Promise<any> {
  try {
    const response = await api.get(`/products/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
}

export async function updateProduct(id: string, productData: productData): Promise<any> {
  try {
    const response = await api.patch(`/products/${id}`, productData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    throw new Error('Failed to update user');
  }
}
