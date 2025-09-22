import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { useCoursesContext } from "../context/courses_context";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import parse from "html-react-parser";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  // MDBIcon,
  // MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

function Archive() {
  const { courses } = useCoursesContext();
  const [loading, setLoading] = useState(true);

  const filteredCourses = courses.filter((course) => course.archieve === true);

  const truncateText = (text, wordLimit) =>
    text.split(" ").slice(0, wordLimit).join(" ") +
    (text.split(" ").length > wordLimit ? "..." : "");
  useEffect(() => {
    if (courses && courses.length > 0) {
      setLoading(false);
    }
  }, [courses]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={50}
          width={50}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
  function convertMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (minutes <= 60) {
      return `${minutes} min`;
    }

    return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} min`;
  }

  if (filteredCourses.length === 0) {
    return (
      <Layout>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
              <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Hi there!
              </p>
              <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                The webinar replay will be available shortly. Stay tuned!
              </p>
              <Link
                to="/"
                class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <MDBContainer fluid>
        {filteredCourses?.map((course) => (
          <MDBRow
            className="justify-content-center mb-3"
            key={course?.courseID}
          >
            <MDBCol md="12" xl="10">
              <MDBCard className="shadow-0 border rounded-3">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol
                      md="12"
                      lg="3"
                      className="mb-4 mb-lg-0 d-flex align-items-center justify-content-center flex-column"
                    >
                      <MDBRipple
                        rippleColor="light"
                        rippleTag="div"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <MDBCardImage
                          src={course?.imageSrc}
                          fluid
                          style={{
                            width: "160px",
                            height: "160px",
                            objectFit: "cover",
                          }}
                          className="fixed-size-image"
                        />
                      </MDBRipple>
                    </MDBCol>

                    <MDBCol md="6">
                      <Link to={`/training/${course?.courseID}`}>
                        <h5 className="text-blue-500">{course?.title}</h5>
                      </Link>

                      <div className="mt-1 mb-0 text-muted small">
                        <span> Name: </span>
                        <span>{course?.instructor}</span>
                        <span className="ml-4"> Duration : </span>
                        <span>{convertMinutes(course?.duration)}</span>
                        <br />
                      </div>
                      <div className="mb-2 text-muted small"></div>
                      <p className=" mb-4 mb-md-0">
                        {course?.description
                          ? parse(truncateText(course.description, 48))
                          : null}
                      </p>
                    </MDBCol>
                    <MDBCol
                      md="6"
                      lg="3"
                      className="border-sm-start-none border-start"
                    >
                      <div className="d-flex flex-row align-items-center mb-1">
                        {course?.discountedPrice ? (
                          <>
                            <h4 className="mb-1 me-1">
                              ${course?.discountedPrice}
                            </h4>
                            <span className="text-danger">
                              <s>
                                $
                                {course?.Pricings[0]?.price
                                  ? course?.Pricings[1]?.price
                                  : course?.price}
                              </s>
                            </span>
                          </>
                        ) : (
                          <h4 className="mb-1 me-1">
                            ${" "}
                            {course?.Pricings[0]?.price
                              ? course?.Pricings[0]?.price
                              : course?.price}
                          </h4>
                        )}
                      </div>
                      <div className="d-flex flex-column mt-4">
                        {/* {course?.webinarDate ? (
                          <div className=" bg-gradient-to-r from-black via-black/80 to-black/40 text-white font-bold text-center py-2 mt-2 rounded">
                            {course?.webinarDate
                              ? new Date(
                                  course?.webinarDate
                                ).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : null}
                          </div>
                        ) : null} */}
                        <Link
                          to={`/archive/${course?.courseID}`}
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                        >
                          Details
                        </Link>{" "}
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
    </Layout>
  );
}

export default Archive;

// import Layout from "./layout";

// import { Link } from "react-router-dom";

// function Archive() {
//   return (
// <Layout>
//   <section class="bg-white dark:bg-gray-900">
//     <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
//       <div class="mx-auto max-w-screen-sm text-center">
//         <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
//           Hi there!
//         </p>
//         <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
//           The webinar replay will be available shortly. Stay tuned!
//         </p>
//         <Link
//           to="/"
//           class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
//         >
//           Back to Homepage
//         </Link>
//       </div>
//     </div>
//   </section>
// </Layout>
//   );
// }

// export default Archive;
