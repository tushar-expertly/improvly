import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "./layout";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  const { paramsid } = useParams(); // Get session_id from URL parameters
  const [enrollmentStatus, setEnrollmentStatus] = useState("");

  useEffect(() => {
    if (paramsid) {
      axios
        .get(
          `https://api.goexpertly.com/users/enrollment/success?session_id=${paramsid}`
        )
        .then((response) => {
          // console.log("response:", response);
          // Assuming the API returns a success message in response.data
          setEnrollmentStatus("Enrollment is successful");
        })
        .catch((error) => {
          // Handle the error case
          setEnrollmentStatus("Enrollment failed");
        });
    }
  }, [paramsid]);

  return (
    <Layout>
      <div className="h-screen">
        <div className="bg-white p-6 md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link
                to="/"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
            {/* Display enrollment status */}
            <div className="mt-4">
              <p className="text-lg font-semibold">{enrollmentStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentSuccess;
