import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout";
import Header from "../Header";
import Input from "../Input";
import { signupFields } from "../formFields";
import FormAction from "../FormAction";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { useCartContext } from "../../../context/cart_context";
import ReCAPTCHA from "react-google-recaptcha";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

function Signup() {
  const { total_items } = useCartContext();
  const [signupState, setSignupState] = useState(fieldsState);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  const { setUser, setToken, setFullName } = useAuth();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaError("");
  };

  const handleSubmit = async (e) => {
    localStorage.clear();
    e.preventDefault();
    if (signupState.password !== signupState.passwordagain) {
      setPasswordError("Please enter the same password.");
      return;
    }
    if (signupState.password === signupState.passwordagain) {
      setPasswordError("");
    }

    if (!captchaValue) {
      setCaptchaError("You can't leave Captcha Code empty");
      return;
    }

    setPasswordError("");
    setCaptchaError("");
    setIsLoading(true);
    await createAccount();
  };

  const createAccount = async () => {
    try {
      const response = await fetch(`https://api.goexpertly.com/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...signupState, siteId: 31 }),
      });
      const data = await response.json();
      // console.log(data);
      // Check response from backend and show appropriate toast message
      if (response.ok) {
        setUser(data.newUser.id);
        setToken(data.token);
        setFullName(data.newUser.fullName);
        localStorage.setItem("user", data.newUser.id);
        localStorage.setItem("username", data.newUser.fullName);
        localStorage.setItem("site", data.token);
        toast.success("Account created successfully!", {
          autoClose: 1000,
          onClose: () => {
            if (total_items > 0) {
              navigate("/cart");
            } else {
              navigate("/");
            }
          },
        });
        return;
      } else {
        toast.error(data.message); // Assuming the backend sends error messages in a 'message' field
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Error creating account. Please try again later.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <Layout>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header
            heading="Signup to create an account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/login"
          />
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <div className="">
              {fields.map((field) => (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={signupState[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                />
              ))}
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              {captchaError && (
                <p className="text-red-500">{captchaError}</p>
              )}{" "}
              {/* Show captcha error message */}
              <ReCAPTCHA
                sitekey="6LfEpP0pAAAAAK0UMKQ44VdN6D-uC1WvnJBNI0mn"
                onChange={handleCaptchaChange}
              />
              <FormAction
                handleSubmit={handleSubmit}
                text="Signup"
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

export default Signup;
