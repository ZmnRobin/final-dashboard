import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUser,
  updateUser,
  findSingleUser,
} from "../../_lib/apiCall/admin/userApi";
import { XCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface UserFormProps {
  closeModal: () => void;
  fetchData: () => void;
  isUpdateMode: boolean;
  userId: string;
}

const UserForm: React.FC<UserFormProps> = ({
  closeModal,
  fetchData,
  isUpdateMode,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string; phone: string; role: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data if in update mode
    if (isUpdateMode) {
      const fetchUserData = async () => {
        try {
          const user = await findSingleUser(userId);
          reset({
            name: user.name,
            phone: user.phone,
            role: user.role,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error here
        }
      };
      fetchUserData();
    }
  }, [isUpdateMode, userId, reset]);

  const onSubmit = async (data: {
    name: string;
    phone: string;
    role: string;
  }) => {
    setLoading(true);
    setError("");
    try {
      if (isUpdateMode) {
        // Update existing user
        await updateUser(userId, data).then(() => {
          fetchData();
          setLoading(false);
          closeModal();
          toast.success("User updated successfully.", { duration: 2000 });
        });
      } else {
        // Create new user
        const userData = {
          name: data?.name,
          phone: data?.phone,
          role: data?.role,
          password: data?.phone,
        };
        await createUser(userData).then(() => {
          fetchData();
          setLoading(false); // Fetch updated user list
          closeModal();
          toast.success("User created successfully.", { duration: 2000 });
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error handling user data:", error);
      toast.error("Failed to create user!");
      setError("Failed to create user.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <span
            className="text-red-600 cursor-pointer flex justify-end"
            onClick={closeModal}
          >
            <XCircleIcon className="w-6" />
          </span>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name", { required: true })} // Register name field
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="user name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              {...register("phone", { required: true })} // Register phone field
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="+8801234567890"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              {...register("role", { required: true })} // Register role field
              id="role"
              name="role"
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option defaultValue="manager">Manager</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {isUpdateMode ? (
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              {loading ? "Updating user, please wait ..." : "Update User"}
            </button>
          ) : (
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              {loading ? "Creating user, please wait ..." : "Create User"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
