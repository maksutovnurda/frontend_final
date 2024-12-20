import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../features/user/userSlice';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token } = useSelector((state) => state.user);
  console.log(token)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
  });
  const [editField, setEditField] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axiosInstance.get('users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.results[0]; // Adjust if multiple users are returned
        setUserId(user.id);
        setProfileData({
          username: user.username,
          email: user.email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (token) {
      fetchUserId();
    }
  }, [token]);

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = async (field) => {
    try {
      const dataToUpdate = {};
      if (field === 'username') {
        dataToUpdate.username = profileData.username;
      } else if (field === 'password') {
        dataToUpdate.password = newPassword;
      }
      await axiosInstance.put(
        `users/${userId}/`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`${field === 'password' ? 'Password' : 'Username'} updated successfully!`);
      setEditField('');
      setNewPassword('');
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      alert(`Error updating ${field}.`);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/home');
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <strong>Username: </strong>
          {editField === 'username' ? (
            <>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
              />
              <button onClick={() => handleSave('username')}>Save</button>
            </>
          ) : (
            <>
              {profileData.username}
              <button onClick={() => handleEdit('username')}>Edit</button>
            </>
          )}
        </div>
        <div className="profile-item">
          <strong>Email: </strong>
          {profileData.email}
        </div>
        <div className="profile-item">
          <strong>Change Password: </strong>
          {editField === 'password' ? (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={() => handleSave('password')}>Save</button>
            </>
          ) : (
            <button onClick={() => handleEdit('password')}>Edit</button>
          )}
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;