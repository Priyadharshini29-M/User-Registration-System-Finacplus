import React, { useEffect, useState } from 'react';
import './User.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users", { position: "top-right" });
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", { position: "top-right" });
    }
  };

  return (
    <div className='userTable'>
      <Link to={"/add"} className="addButton">
        <i className="fa-solid fa-user-tie"></i> REGISTRATION
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0} aria-label="User Data">
        <thead>
          <tr>
            <th>S.NO.</th>
            <th>User Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Password</th>
            <th>Gender</th>
            <th>About</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
              <td>••••••••</td> {/* Masked password */}
              <td>{user.gender}</td>
              <td>{user.about}</td>
              <td className="actionButton">
                <button onClick={() => deleteUser(user._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <Link to={'/edit/' + user._id}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
