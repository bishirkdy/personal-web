import React from 'react';
import { useGetUsersQuery } from '../../../redux/api/authApi';
import { useDeleteUserMutation } from '../../../redux/api/authApi';

export default function User() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const { data: users, isLoading, error , refetch } = useGetUsersQuery();
    const [deleteUser , {isLoading : deleteIsLoading , isError : deleteIsError}] = useDeleteUserMutation();
    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error loading users: {error.message}</div>;
    }
    const deleteHandler = async (_id) => {
        try {
            await deleteUser(_id).unwrap();
            refetch();
            console.log("User deleted successfully");
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    }
    const filterUser = users?.data?.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.role.toLowerCase().includes(searchTerm.toLowerCase());
    })
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-primary)] px-2 py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="mt-3 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
                {
                    filterUser.map((user , index ) =>(
                        <tr key={index} className="hover:bg-gray-50 transition">
                            <td className="p-3 whitespace-nowrap">{user.name}</td>
                            <td className="p-3 whitespace-nowrap">{user.email}</td>
                            <td className="p-3 whitespace-nowrap">{user.role}</td>
                            <td className="p-3 whitespace-nowrap">
                                <span className={`inline-block px-2 py-1 text-xs rounded font-semibold ${user.isVerified === true ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {user.isVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </td>
                            <td className="p-3 flex gap-2">
                                <button className="px-3 py-1 bg-blue-100 cursor-pointer text-blue-700 rounded hover:bg-blue-200 hover:text-blue-800 transition text-sm">
                                    Edit
                                </button>
                                <button 
                                onClick={() => deleteHandler(user._id)}
                                className="px-3 py-1 bg-red-100 cursor-pointer text-red-700 rounded hover:bg-red-200 hover:text-red-800 transition text-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
