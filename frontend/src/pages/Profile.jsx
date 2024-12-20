import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/user/userSlice";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
  });
  const [editField, setEditField] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axiosInstance.get("users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.results[0];
        setUserId(user.id);
        setProfileData({
          username: user.username,
          email: user.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (token) {
      fetchUserId();
    }
  }, [token]);

  const handleEdit = (field) => {
    setEditField(field);
    setStatusMessage("");
    setErrorMessage("");
  };

  const handleSaveUsername = async () => {
    try {
      await axiosInstance.put(
        `users/${userId}/`,
        { username: profileData.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatusMessage("Username updated successfully!");
      setErrorMessage("");
      setEditField("");
    } catch (error) {
      console.error("Error updating username:", error);
      setErrorMessage("Failed to update username. Please try again.");
    }
  };

  const handlePasswordResetRequest = async () => {
    try {
      await axiosInstance.post("password_reset/", {
        email: profileData.email,
      });
      setStatusMessage(
        "Password reset request sent! Check your email for the reset link."
      );
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to send password reset request. Please try again.");
      setStatusMessage("");
      console.error("Error sending password reset request:", error);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <strong>Username: </strong>
          {editField === "username" ? (
            <>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
              />
              <button onClick={handleSaveUsername}>Save</button>
            </>
          ) : (
            <>
              {profileData.username}
              <button onClick={() => handleEdit("username")}>Edit</button>
            </>
          )}
        </div>
        <div className="profile-item">
          <strong>Email: </strong>
          {profileData.email}
        </div>
        <div className="profile-item">
          <button
            onClick={handlePasswordResetRequest}
            className="reset-password-button"
          >
            Change password
          </button>
        </div>
      </div>
      {statusMessage && <p className="success-message">{statusMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;
