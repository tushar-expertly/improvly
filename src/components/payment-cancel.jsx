import React from "react";
import Layout from "./layout";
import { Link } from "react-router-dom";

function PaymentCancel() {
  return (
    <Layout>
      {" "}
      <div className="h-screen">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0ZM16.242,7.758a1,1,0,1,1,1.414,1.414L13.414,12l4.242,4.242a1,1,0,1,1-1.414,1.414L12,13.414l-4.242,4.242a1,1,0,1,1-1.414-1.414L10.586,12,6.344,7.758a1,1,0,0,1,1.414-1.414L12,10.586Z"
            ></path>
          </svg>

          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Canceled!
            </h3>
            <p className="text-gray-600 my-2">
              Your online payment was not completed.
            </p>
            <div className="py-10 text-center">
              <Link
                to="/"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentCancel;
