'use client'
import React, { useEffect, useState } from 'react';
import Search from '../../../_components/admin/Search';
import Table from '../../../_components/admin/Table';
import UserForm from '../../../_components/admin/UserForm';
import { getAllUsers } from '../../../_lib/apiCall/admin/userApi';
import { PlusIcon } from '@heroicons/react/24/outline';
import Loader from '@/app/_components/common/Loader';

interface User {
  _id: string;
  name: string;
  phone: string;
  role: string;
  createdAt: Date; // Assuming creationDate is a string for now
}


export default function UsersPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]); // Initialize userList state
  const [updateUserId, setUpdateUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Fetch user list when the component mounts
  const fetchData = async () => {
    setLoading(true); // Set loading to true before the API call
    try {
      const users = await getAllUsers();
      setUserList(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error here (e.g., display error message)
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Filter users based on the search term
  const filteredUsers = userList.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setUpdateUserId(null); // Reset updateUserId for create mode
    setShowModal(true);
  };

  const openUpdateModal = (userId: string) => {
    setUpdateUserId(userId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." onSearch={handleSearch} />
        <button
          onClick={openCreateModal}
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Create User</span>{' '}
          <PlusIcon className="h-5 md:ml-4" />
        </button>
      </div>
      <Table userList={filteredUsers} setUserList={setUserList} openUpdateModal={openUpdateModal} loading={loading} setLoading={setLoading}/>
      <div className="mt-5 flex w-full justify-center"></div>

      {/* UserForm Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {loading ? (
            // Show loader while the API call is in progress
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
                </div>
              ) : (
                // Show the UserForm component when not loading
                <UserForm closeModal={closeModal} fetchData={fetchData} isUpdateMode={updateUserId !== null} userId={updateUserId} />
              )}
          </div>
        </div>
      )}
    </div>
  );
}
