'use client'
import React, { useEffect, useState } from 'react';
import Loader from '@/app/_components/common/Loader';
import ProductCard from '@/app/_components/manager/ProductCard';
import ProductForm from '@/app/_components/manager/ProductForm';
import { getAllProduct,deleteSingleProduct } from '@/app/_lib/apiCall/manager/productApi';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Products {
  _id: string;
  imageUrl: string;
  name: string;
  category: string;
  unitPrice: number;
  stock: number;
}

export default function ProductsPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productList, setProductList] = useState<Products[]>([]);
  const [updateProductId, setUpdateProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const products = await getAllProduct();
      setProductList(products);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct=async(id:string)=>{
    setLoading(true);
    try {
      await deleteSingleProduct(id).then(()=>{
        fetchData()
        toast.success("Food Item deleted successfully.",{duration:3000})
      });

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const openCreateModal = () => {
    setUpdateProductId(null);
    setShowModal(true);
  };

  const openUpdateModal = (productId: string) => {
    setUpdateProductId(productId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main>
      {loading && <Loader />}
      <div className="w-full">
        <div className="flex items-center justify-end gap-2 md:mt-8">
          <button
            onClick={openCreateModal}
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Create Product</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          {productList.map((product) => (
            <ProductCard key={product._id} product={product} openUpdateModal={openUpdateModal} deleteProduct={deleteProduct}/>
          ))
          }
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <ProductForm
                closeModal={closeModal}
                fetchData={fetchData}
                isUpdateMode={updateProductId !== null}
                productId={updateProductId}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
