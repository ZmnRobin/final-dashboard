import api from '../apiInstance';

interface UserData {
  name: string;
  phone: string;
  // Add other properties as needed
}

export async function getAllUsers(): Promise<any> {
  try {
    const response = await api.get('/users/');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function createUser(userData: UserData): Promise<any> {
  try {
    const response = await api.post('/users/auth/register', userData);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

export async function deleteSingleUser(id: string): Promise<any> {
  try {
    const response = await api.delete(`/users/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}

export async function findSingleUser(id: string): Promise<any> {
  try {
    const response = await api.get(`/users/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
}

export async function updateUser(id: string, userData: UserData): Promise<any> {
  try {
    const response = await api.patch(`/users/${id}`, userData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    throw new Error('Failed to update user');
  }
}
