import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import axiosInstance from '../api/axiosInstance';

const Profile = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    password: '',
  });

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
          password: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (token) {
      fetchUserId();
    }
  }, [token]);

  const handleSave = async () => {
    try {
      await axiosInstance.put(
        `users/${userId}/`,
        {
          username: profileData.username,
          email: profileData.email,
          ...(profileData.password && { password: profileData.password }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile.');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-info">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={profileData.username}
          onChange={(e) =>
            setProfileData({ ...profileData, username: e.target.value })
          }
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={(e) =>
            setProfileData({ ...profileData, email: e.target.value })
          }
        />
        <label>Password (optional)</label>
        <input
          type="password"
          name="password"
          value={profileData.password}
          onChange={(e) =>
            setProfileData({ ...profileData, password: e.target.value })
          }
        />
      </div>
      <div className="profile-actions">
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
