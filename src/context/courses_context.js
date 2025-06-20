import React, { useContext, useReducer, useEffect, useCallback } from "react";
import { GET_CATEGORIES, GET_COURSES, GET_SINGLE_COURSE } from "../actions";
import reducer from "../reducers/courses_reducer";
import courses from "../utils/data";
import axios from "axios"; // Import Axios

const initialState = {
  courses: [],
  single_course: {},
  categories: [],
};

const CoursesContext = React.createContext();

export const CoursesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        "https://api.goexpertly.com/admin/courses"
      );
      const filteredCourses = response.data.filter((course) =>
        course.Sites.some(
          (site) => site.name === "improvly" || site.siteId === 31
        )
      );
      const allCourses = filteredCourses?.sort(
        (a, b) => new Date(a.webinarDate) - new Date(b.webinarDate)
      );
      dispatch({ type: GET_COURSES, payload: allCourses });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchSingleCourse = useCallback(
    async (id) => {
      try {
        const existingCourse = state.courses.find(
          (course) => course.courseID === Number(id)
        );
        if (existingCourse) {
          dispatch({ type: GET_SINGLE_COURSE, payload: existingCourse });
        } else {
          const response = await axios.get(
            `https://api.goexpertly.com/admin/courses/${id}`
          );
          dispatch({ type: GET_SINGLE_COURSE, payload: response.data });
        }
      } catch (error) {
        console.error("Error fetching single course:", error);
      }
    },
    [state.courses]
  );

  const fetchCategories = () => {
    const categories = [...new Set(courses.map((item) => item.category))];
    dispatch({ type: GET_CATEGORIES, payload: categories });
  };

  useEffect(() => {
    fetchCourse();
    fetchCategories();
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        ...state,
        fetchSingleCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesContext = () => {
  return useContext(CoursesContext);
};
