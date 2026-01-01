import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/authcontext';
import './Users.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user: loggedInUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/users");
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleBlock = async (userToUpdate) => {
    if (loggedInUser.id === userToUpdate.id) {
      toast.error("You cannot block your own admin account.");
      return;
    }

    const updatedUser = {
      ...userToUpdate,
      isBlocked: !userToUpdate.isBlocked,};

    try {
      await axios.put(`http://localhost:5001/users/${userToUpdate.id}`, updatedUser);

      setUsers(currentUsers =>
        currentUsers.map(user =>
          user.id === userToUpdate.id ? updatedUser : user
        )
      );

      toast.success(`User ${userToUpdate.name} has been ${updatedUser.isBlocked ? 'blocked' : 'unblocked'}.`);
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast.error("Could not update user status.");
    }
  };

  const handleDeleteUser = async (userIdToDelete) => {
    if (loggedInUser.id === userIdToDelete) {
      toast.error("You cannot delete your own admin account.");
      return;
    }
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      try {
        await axios.delete(`http://localhost:5001/users/${userIdToDelete}`);
        setUsers(currentUsers =>
          currentUsers.filter(user => user.id !== userIdToDelete)
        );
        toast.success("User deleted successfully.");
      } catch (error) {
        console.error("Failed to delete user:", error);
        toast.error("Could not delete the user.");
      }
    }
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="admin-users-container">
      <h1>Manage Users</h1>
      <p>A list of all registered users in your store.</p>
      
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin?</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>
                <span className={user.isBlocked ? 'status-blocked' : 'status-active'}>
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td className="action-cell">
                 <button
                  className={user.isBlocked ? 'unblock-btn' : 'block-btn'}
                  onClick={() => handleToggleBlock(user)}
                >
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}