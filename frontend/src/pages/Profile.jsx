import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { clearUser } from "../features/user/userSlice";
import { refreshToken } from "../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axiosInstance.get('profile/');
  //       console.log(response.data);
  //     } catch (error) {
  //       if (error.response.status === 401) {
  //         dispatch(refreshToken());
  //       }
  //     }
  //   };
  //   fetchProfile();
  // }, [dispatch, token]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <h1>Profile Page</h1>
      <button onClick={() => dispatch(clearUser)}>Logout</button>
    </div>
  );
};

export default Profile;
