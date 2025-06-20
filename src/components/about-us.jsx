import React from "react";
import Layout from "./layout";
// import tailoredSolutions from "../Assets/about/undraw_solution_mindset_re_57bf.svg";
// import experts from "../Assets/about/undraw_experts_re_i40h.svg";
// import patners from "../Assets/about/undraw_team_up_re_84ok.svg";
// import excel from "../Assets/about/undraw_details_8k13.svg";
// import impact from "../Assets/about/24372256_6909933.svg";
// import { Link } from "react-router-dom";

function Aboutus() {
  return (
    <Layout>
      {/* 
<!-- Section 2 --> */}
      <div class="py-16 bg-white">
        {/* <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div class="md:5/12 lg:w-5/12">
              <img
                src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                alt="image"
                loading="lazy"
                width=""
                height=""
              />
            </div>
            <div class="md:7/12 lg:w-6/12">
              <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">
                About Us
              </h2>
              <p class="mt-6 text-gray-600">
                At Gradeage, we believe in the transformative power of
                education. Our mission is to empower individuals and
                organizations worldwide through high-quality online training
                programs designed to unlock potential and drive success.
              </p>
            </div>
          </div>
        </div> */}

        <div className="bg-gray-100  flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-8xl w-full space-y-8">
            <div className="bg-gray-100 shadow-md rounded-lg p-8">
              <div className="space-y-6">
                {/* <section className="">
                  <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                          <div className="relative">
                            <dt>
                              <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                                Our Impact
                              </p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                              We provide a vibrant online learning platform with
                              a diverse range of courses designed to equip you
                              with the skills and knowledge you need to succeed.
                              Our satisfied learners have used our training.
                            </dd>
                          </div>
                          <div className="relative">
                            <dt>
                              <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                                The Problem We Solve
                              </p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                              {" "}
                              In today's rapidly changing world, traditional
                              learning methods can feel restrictive. We
                              understand the challenges of busy schedules,
                              geographical limitations, and the need for
                              flexible learning options
                            </dd>
                          </div>
                          <div className="relative">
                            <dt>
                              <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                                Meet the Experts
                              </p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                              {" "}
                              Our team is comprised of passionate instructors
                              and industry veterans with a wealth of experience.
                              You can learn more about our team on our dedicated
                              page!
                            </dd>
                          </div>
                          <div className="relative">
                            <dt>
                              <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                                Learning Designed for You
                              </p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                              {" "}
                              We believe in engaging and interactive online
                              training. Whether you're a visual learner, an
                              auditory learner, or a hands-on learner, we have a
                              training approach that caters to your style.
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </section> */}
                <div>
                  <h4 className=" text-gray-800">Who We Are</h4>
                  <p className="mt-2 text-gray-600">
                    Improvly has quickly become a trusted leader in online
                    education. With a team of dedicated professionals and
                    experts in various fields, we are committed to delivering
                    innovative, engaging, and effective learning experiences
                  </p>
                </div>
                <div>
                  <h4 className=" text-gray-800">What We Offer</h4>
                  <p className="mt-2 text-gray-600">
                    Our comprehensive range of online training courses covers a
                    diverse array of topics . Whether you're a beginner looking
                    to acquire new skills or a seasoned professional seeking
                    advanced knowledge, we have courses tailored to meet your
                    needs.
                  </p>
                </div>
                <div>
                  <h4 className=" text-gray-800">Meet the Experts</h4>
                  <p className="mt-2 text-gray-600">
                    Our team is comprised of passionate instructors and industry
                    veterans with a wealth of experience. [Briefly introduce a
                    key team member and their expertise]. You can learn more
                    about our team on our dedicated page!
                  </p>
                </div>
                <div>
                  <h4 className=" text-gray-800">Learning Designed for You</h4>
                  <p className="mt-2 text-gray-600">
                    We believe in engaging and interactive online training.
                    Whether you're a visual learner, an auditory learner, or a
                    hands-on learner, we have a training approach that caters to
                    your style.
                  </p>
                </div>

                <div>
                  <h4 className=" text-gray-800">Why Choose Us?</h4>
                  <p className="mt-2 text-gray-600">
                    <ul>
                      <li>
                        • Skill Up, Get Ahead: Our courses are designed to equip
                        you with the in-demand skills needed to thrive in
                        today's job market.
                      </li>
                      <li>
                        • Learn on Your Schedule: Enjoy the flexibility of
                        learning anytime, anywhere with our user-friendly online
                        platform.
                      </li>
                      <li>
                        • Join a Community: Connect with fellow learners, ask
                        questions, and share your experiences in our online
                        learning community.
                      </li>
                    </ul>
                  </p>
                </div>

                <div>
                  <h4 className=" text-gray-800">Get Started Today</h4>
                  <p className="mt-2 text-gray-600">
                    Ready to embark on your learning journey? Browse our course
                    catalog, explore our offerings, and take the first step
                    towards achieving your goals with Gradeage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Aboutus;
