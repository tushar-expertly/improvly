import React from "react";
import Layout from "../layout";
// import Slider from "../slider/slider";
// import startupPng from "../../Assets/startup.png";
// import OurExperts from '../OurExperts'
// import Testimonials from '../Testimonials'
import { Link } from "react-router-dom";
import abouut from "../../Assets/logo/abouut.jpg";
const ButtonArrow = () => {
  return (
    <svg
      className="size-5 rtl:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
};

function Home() {
  return (
    <Layout>
      {" "}
      <div className="md:w-[89%] mx-auto px-4 py-12 md:py-16 bg-gradient-to-r from-[#e0f7fa] via-[#fce4ec] to-[#f3e5f5] mt-2">

        {/* <GradientHeading title="About Us" size="text-6xl" /> */}
        <div
          className={` bg-sky  dark:bg-customlight  p-2 flex items-center justify-between flex-col-reverse gap-0 lg:gap-10	lg:flex-row  rounded-xl hover:-translate-y-1 hover:scale-110 duration-300 transition ease-in-out delay-150 `}
        >
          <div className="p-4 w-full text-center lg:text-start">
            <h2 className="text-4xl lg:text-5xl font-medium ">
              Welcome To Improvly
            </h2>
            <p className="text-gray-500 font-medium mt-4 md:mt-8 text-sm md:text-base leading-6">
              At Improvly, we are committed to the transformative impact of
              education. Our goal is to empower people and organizations
              globally with top-notch online training programs that unlock
              potential and foster success.
            </p>
            <div className="mt-6 md:mt-10">
              <Link
                className="group relative inline-flex items-center overflow-hidden rounded-lg bg-transparent border border-black px-6 py-3  hover:bg-black  focus:outline-none "
                to="/about-us"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <ButtonArrow />
                </span>

                <span className=" font-medium transition-all group-hover:me-4">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
          <div className="p-4 w-full  flex justify-center">
            <img
              alt="about us"
              src={abouut}
              className="w-full md:h-[395px] h-[232px]  object-cover rounded-lg p-2 hover:p-0 bg-white duration-300 transition ease-in-out delay-150 hover:-translate-y-1"
            />
          </div>
        </div>
      </div>
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-10">
            <dl className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-12">
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <dt>
                  <p className="font-heading text-xl leading-7 font-semibold text-gray-800 mb-3">
                    Our Accomplishments
                  </p>
                </dt>
                <dd className="text-base text-gray-600">
                  We provide a dynamic online platform with a broad range of
                  courses designed to equip you with the necessary skills and
                  knowledge for success. Our students have reached their goals
                  through our comprehensive training programs.
                </dd>
              </div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <dt>
                  <p className="font-heading text-xl leading-7 font-semibold text-gray-800 mb-3">
                    Meet Our Experts
                  </p>
                </dt>
                <dd className="text-base text-gray-600">
                  Our team comprises dedicated instructors and seasoned industry
                  professionals with extensive experience. Learn more about our
                  experts on our dedicated team page!
                </dd>
              </div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <dt>
                  <p className="font-heading text-xl leading-7 font-semibold text-gray-800 mb-3">
                    Challenges We Tackle
                  </p>
                </dt>
                <dd className="text-base text-gray-600">
                  In today's fast-paced world, traditional learning methods can
                  feel restrictive. We understand the challenges of busy
                  schedules, geographical barriers, and the need for flexible
                  learning solutions.
                </dd>
              </div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <dt>
                  <p className="font-heading text-xl leading-7 font-semibold text-gray-800 mb-3">
                    Personalized Learning Experiences
                  </p>
                </dt>
                <dd className="text-base text-gray-600">
                  We are dedicated to providing engaging and interactive online
                  training. Whether you prefer visual, auditory, or hands-on
                  learning, we offer training approaches tailored to your unique
                  learning style.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      {/* <Slider /> */}
    </Layout>
  );
}

export default Home;
