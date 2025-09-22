import React, { useState } from "react";
import Layout from "../layout";
import FormAction from "./FormAction";
import Header from "./Header";
import { UpdatePasswordFields } from "./formFields";
import Input from "./Input";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fields = UpdatePasswordFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function UpdatePassword() {
  const { tokenid } = useParams();
  const [updatePasswordFieldsState, setUpdatePasswordFields] =
    useState(fieldsState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdatePasswordFields({
      ...updatePasswordFieldsState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    const { newPassword, confirmPassword } = updatePasswordFieldsState;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.goexpertly.com/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword,
            token: tokenid,
          }),
        }
      );

      if (response.ok) {
        toast.success("Password updated successfully!", {
          autoClose: 1000,
          onClose: () => navigate("/login"),
        });
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header heading="Update Account Password" />

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
              {fields.map((field) => (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={updatePasswordFieldsState[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                  disabled={isLoading}
                />
              ))}
              {error && (
                <p className="text-sm text-center text-red-500">{error}</p>
              )}
              <FormAction
                handleSubmit={handleSubmit}
                text={isLoading ? "Updating..." : "Update"}
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default UpdatePassword;
