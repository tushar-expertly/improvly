import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout";
import Header from "../Header";
import Input from "../Input";
import { loginFields } from "../formFields";
import FormExtra from "../FormExtra";
import FormAction from "../FormAction";
import { useAuth } from "../../../context/AuthProvider";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    localStorage.clear();
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.goexpertly.com/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginState),
        }
      );
      const res = await response.json();
      // console.log(res);
      if (response.ok) {
        setUser(res.userId);
        setToken(res.token);
        localStorage.setItem("user", res.userId);
        localStorage.setItem("site", res.token);
        localStorage.setItem("username", res?.fullName);

        toast.success("Login successful!");
        navigate("/"); // Navigate to home page
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
          />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
              {fields.map((field) => (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={loginState[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
            <FormExtra />
            <FormAction
              handleSubmit={handleSubmit}
              text="Login"
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Login;
