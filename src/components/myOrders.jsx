import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

function MyOrders() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    if (token && user) {
      axios
        .get(`https://api.goexpertly.com/users/${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-6 rounded-lg">Loading...</div>
        </div>
      </Layout>
    );
  }
  if (orders?.enrolledCourses < 1) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold">No orders available!</h1>
            <p className="text-gray-600">
              Your Order is currently empty. Explore our courses and add items
              to your cart.
            </p>
            <Link
              to="/training"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Browse Training
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return <Layout>Error: {error.message}</Layout>;
  }

  return (
    <Layout>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            My Orders
          </h1>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            {orders.enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
              >
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      className="w-full hidden md:block"
                      src={course.imageSrc}
                      alt={course.title}
                    />
                    <img
                      className="w-full md:hidden"
                      src={course.imageSrc}
                      alt={course.title}
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                        {course.title}
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            Instructor:{" "}
                          </span>{" "}
                          {course.instructor}
                        </p>
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            Duration:{" "}
                          </span>{" "}
                          {course.duration} mins
                        </p>
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            Price:{" "}
                          </span>{" "}
                          ${course.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-6 items-start w-full">
                      {/* <button
                        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={() => setPlayingVideo(course.videoLink)}
                      >
                        Play Video
                      </button> */}
                      <a
                        className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
                        href={course.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Invoice
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {playingVideo && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-full max-w-4xl">
            <button
              className="absolute top-0.5 right-0.5 text-gray-700 hover:text-gray-900"
              onClick={() => setPlayingVideo(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full pb-[56.25%]">
              <video
                className="absolute top-0 left-0 w-full h-full"
                src={playingVideo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                controls
                controlsList="nodownload"
              ></video>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default MyOrders;
