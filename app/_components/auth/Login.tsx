'use client'
// Import necessary modules
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { backend_url } from "@/app/_lib/utils/const";
import { useForm, SubmitHandler } from 'react-hook-form';

// Define the Login component
export default function Login() {
  // Get the router instance
  const router = useRouter();
  // State for handling errors
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string; password: string }>();

  const onSubmit: SubmitHandler<{ phone: string; password: string }> = async (data) => {
    setError('');
    setLoading(true);
  
    try {
      // Send a request to your backend using Axios
      const response = await axios.post(`${backend_url}/users/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const { accessToken, role } = response.data;
        Cookies.set("token", accessToken);
        Cookies.set("role", role.toLowerCase());
        setLoading(false);
        router.push(`/${role.toLowerCase()}`); // Redirect to role-based dashboard
      } else {
        // Handle non-successful response (e.g., display error message)
        const errorResponse = response.data;
        setError(errorResponse.message || 'An error occurred');
        setLoading(false);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error);
      setError('An error occurred during login');
      setLoading(false);
    }
  };

  // Return the JSX content
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-slate-200 rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Login Form</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-800"
            >
              Phone
            </label>
            <input
              {...register('phone', { required: 'Phone is required' })}
              placeholder="+8801XXXXXXXXX"
              type="text"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              placeholder="password"
              type="password"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          <div className="mt-5">
            <button
              type="submit"
              className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging In ...' : 'Login'}
            </button>
          </div>
        </form>
         {/* Display loading indicator or other feedback if needed */}
         {loading && <p className="text-gray-600 text-sm mt-2">Logging in...</p>}
         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
