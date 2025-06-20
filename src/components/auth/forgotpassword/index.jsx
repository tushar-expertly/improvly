import React, { useState } from "react";
import Layout from "../../layout";
import FormAction from "../FormAction";
import Header from "../Header";
import { ForgotPasswordFields } from "../formFields";
import Input from "../Input";
// import { useNavigate } from "react-router-dom";

const fields = ForgotPasswordFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
function ForgotPassword() {
  const [forgotPasswordFieldsState, setForgotPasswordFieldsState] =
    useState(fieldsState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setForgotPasswordFieldsState({
      ...forgotPasswordFieldsState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    localStorage.clear();
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.goexpertly.com/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordFieldsState.email,
            siteId: 31,
          }),
        }
      );
      if (response.ok) {
        setIsSubmitted(true);
        setMessage("Please check your email to reset your password.");
      } else {
        setMessage(
          "There was an issue with your request. Please try again later."
        );
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header
            heading="FORGOT PASSWORD"
            paragraph="Already have an account? "
            linkName="Back to Login"
            linkUrl="/login"
          />

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
              {fields.map((field) => (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={forgotPasswordFieldsState[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                  disabled={isSubmitted || isLoading}
                />
              ))}
              {message && <p className="text-sm text-center">{message}</p>}
              <FormAction
                handleSubmit={handleSubmit}
                text={isLoading ? "Loading..." : "Request reset link"}
                disabled={isSubmitted || isLoading}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
