import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./ProfileView.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";

const ProfileView = () => {
  return (
    <div className="profile-layout">
      <ProfileSidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileView;
