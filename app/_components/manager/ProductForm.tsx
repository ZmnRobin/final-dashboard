import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProduct, updateProduct, findSingleProduct } from '../../_lib/apiCall/manager/productApi';
import toast from 'react-hot-toast';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Loader from '../common/Loader';

interface ProductFormProps {
  closeModal: () => void;
  fetchData: () => void;
  isUpdateMode: boolean;
  productId: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ closeModal, fetchData, isUpdateMode, productId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string; category: string; unitPrice: number; stock: number }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Example categories
  const categories = [
    { name: "Snacks" },
    { name: "Breakfast" },
    { name: "Lunch" },
    { name: "Dinner" },
    { name: "Dry food" },
  ];

  useEffect(() => {
    // Fetch product data if in update mode
    if (isUpdateMode) {
      setLoading(true)
      const fetchProductData = async () => {
        try {
          const product = await findSingleProduct(productId);
          reset({
            name: product.name,
            category: product.category,
            unitPrice: product.unitPrice,
            stock: product.stock,
          });
          setLoading(false)
        } catch (error) {
          console.error('Error fetching product data:', error);
          // Handle error here
        }
      };

      fetchProductData();
    }
  }, [isUpdateMode, productId, reset]);

  const onSubmit = async (data: { name: string; category: string; unitPrice: number; stock: number }) => {
    setLoading(true)
    setError('')
    try {
      if (isUpdateMode) {
        // Update existing product
        const updateData={
          name: data?.name,
          category: data?.category,
          unitPrice: Number(data?.unitPrice),
          stock: Number(data?.stock),
          imageUrl:"/images/download.jpeg"
        }
        await updateProduct(productId, updateData).then(() => {
          fetchData();
          setLoading(false);
          closeModal();
          toast.success("Food item updated successfully",{duration:3000})
        });
      } else {
        // Create new product
        const productData={
            name: data?.name,
            category: data?.category,
            unitPrice: Number(data?.unitPrice),
            stock: Number(data?.stock),
            imageUrl:"/images/download.jpeg"
        }
        await createProduct(productData).then(() => {
          fetchData();
          setLoading(false);
          closeModal();
          toast.success("Food item added successfully",{duration:3000})
        });
      }
    } catch (error) {
      console.error('Error handling product data:', error);
      setError('An error occurred while creating/updating the product!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {loading && <Loader/>}
      <div className="bg-white p-8 rounded-lg w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="text-red-600 cursor-pointer flex justify-end" onClick={closeModal}>
            <XCircleIcon className='w-6'/>
          </span>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register('name', { required: true })}
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="product name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register('category', { required: true })}
              id="category"
              name="category"
              className="mt-1 p-2 w-full border rounded-md"
            >
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
              Unit Price
            </label>
            <input
              {...register('unitPrice', { required: true })}
              type="number"
              id="unitPrice"
              name="unitPrice"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="unit price"
            />
            {errors.unitPrice && <p className="text-red-500 text-sm">{errors.unitPrice.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              {...register('stock', { required: true })}
              type="number"
              id="stock"
              name="stock"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="stock"
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {isUpdateMode ? (
            <button disabled={loading} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">
              {loading ? 'Updating product, please wait ...' : 'Update Product'}
            </button>
          ) : (
            <button disabled={loading} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">
              {loading ? 'Creating product, please wait ...' : 'Create Product'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
