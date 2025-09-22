import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

function Profile() {
  const { token, user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (token && user) {
      axios
        .get(`https://api.goexpertly.com/users/${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [token, user]);

  if (loading) {
    return (
      <Layout>
        <div className="container mt-8 mb-8">
          <div className="bg-white p-6 shadow-md rounded-lg profile-card">
            <div className="flex items-center justify-center">
              <span className="text-gray-500">Loading...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mt-8 mb-8">
          <div className="bg-white p-6 shadow-md rounded-lg profile-card">
            <div className="flex items-center justify-center">
              <span className="text-red-500">Error loading profile</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-8 mb-8">
        <div className="bg-white p-6 shadow-md rounded-lg profile-card">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-4">
            <span className="text-green-500">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="tracking-wide text-xl">My Profile</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Name:</div>
                <div className="px-4 py-2">{userInfo?.user?.fullName}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Contact No.:</div>
                <div className="px-4 py-2">{userInfo?.user?.phone}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email:</div>
                <div className="px-4 py-2">
                  <a
                    className="text-blue-600 hover:underline"
                    href={`mailto:${userInfo?.user?.email}`}
                  >
                    {userInfo?.user?.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
