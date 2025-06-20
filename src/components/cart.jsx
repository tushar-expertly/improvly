import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import styled from "styled-components";
import { MdClear } from "react-icons/md";
import CartItem from "./CartItem";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthProvider";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();
  const {
    cart: cartItems,
    total_items,
    total_amount,
    clearCart,
  } = useCartContext();
  const applyPromoCode = async () => {
    setPromoMessage("");
    if (!promoCode) return;
    setPromoLoading(true);
    try {
      const response = await fetch(
        "https://api.goexpertly.com/users/coupons/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cartItems, code: promoCode, siteId: 31 }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to apply promo code");
      }

      const couponData = await response.json();
      const { discountValue, finalPrice } = couponData;
      // console.log(finalPrice);

      // const discount = total_amount * (discountValue / 100);
      setDiscountedAmount(finalPrice);
      setPromoMessage(
        `Promo code applied successfully!  ${discountValue}%  discount is applicable.`
      );
      toast.success("Promo code applied successfully!");
    } catch (error) {
      setDiscountedAmount(null);
      console.error("Error applying promo code:", error);
      toast.error("Invalid promo code");
    } finally {
      setPromoLoading(false);
    }
  };

  const makePayment = async () => {
    if (!token) {
      navigate("/signup");
      return;
    }

    setLoading(true);
    try {
      const stripe = await loadStripe(
        `pk_live_51PBO6KRq04FSuQPhBC5MEWxXDGMTnAaMtygmV7iVc1LQmKfteRLEK8ABqZH1M6tPY6vkRMxpEfOz9s1dXkpLLHw4001vzhBRh3`
      );

      const body = {
        cartItems,
        couponCode: promoCode ? promoCode : "",
        siteId: 31,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`https://api.goexpertly.com/users/enroll`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error("Network response was not ok");
        throw new Error("Network response was not ok");
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      toast.error("Error during payment process");
      console.error("Error during payment process:", error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length < 1) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold">Your cart is empty!</h1>
            <p className="text-gray-600">Add Course to it now.</p>
            <Link
              to="/"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Go back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <Layout>
        <CartWrapper>
          <div className="container">
            <div className="cart-pg-title">
              <h3>Shopping Cart</h3>
            </div>
            <div className="cart-grid grid">
              <div className="cart-grid-left">
                <div className="flex flex-wrap flex-between">
                  <div className="cart-count-info">
                    <span className="fw-7 fs-18">{total_items}</span> Course in
                    Cart
                  </div>
                  <button
                    type="button"
                    className="cart-clear-btn flex fs-15 fw-6 text"
                    onClick={() => clearCart()}
                  >
                    <MdClear className="text-pink ml-4 mt-1" />
                    <span className="d-inline-block text-pink ml-2">
                      Clear All
                    </span>
                  </button>
                </div>
                <div className="cart-items-list grid">
                  {cartItems.map((cartItem, index) => (
                    <CartItem key={index} cartItem={cartItem} />
                  ))}
                </div>
                {token ? (
                  <div className="promo-code-section">
                    {promoMessage && <p>{promoMessage}</p>}
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button onClick={applyPromoCode} disabled={promoLoading}>
                      {promoLoading ? (
                        <ClipLoader size={24} color={"#ffffff"} />
                      ) : (
                        "Apply Promo Code"
                      )}
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="cart-grid-right">
                <div className="cart-total">
                  <span className="d-block fs-18 fw-6">Total:</span>
                  <div className="cart-total-value fw-8">
                    $
                    {discountedAmount
                      ? discountedAmount
                      : total_amount?.toFixed(2)}
                  </div>
                  <button
                    type="button"
                    className="checkout-btn bg-purple text-white fw-6"
                    onClick={makePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <ClipLoader size={24} color={"#ffffff"} />
                    ) : (
                      "Checkout"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CartWrapper>
      </Layout>
      <ToastContainer />
    </div>
  );
}
const CartWrapper = styled.div`
  padding: 30px 0;
  .card-pg-title {
    padding: 20px 0 6px 0;
  }
  .cart-grid {
    row-gap: 40px;
    .cart-grid-left {
      margin-bottom: 30px;
    }

    .cart-clear-btn {
      span {
        margin-left: 6px;
      }
    }

    .cart-items-list {
      margin-top: 20px;
      row-gap: 12px;
    }
    .promo-code-section {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      input {
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        flex-grow: 1;
      }

      button {
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #45a049;
        }
      }

      p {
        color: green;
        font-size: 14px;
      }
    }
    .cart-total-value {
      font-size: 34px;
    }
    .checkout-btn {
      padding: 14px 28px;
      letter-spacing: 1px;
      margin-top: 12px;
      transition: var(--transition);

      &:hover {
        background-color: var(--clr-dark);
      }
    }
    .cart-total {
      padding-bottom: 50px;
    }

    @media screen and (min-width: 992px) {
      grid-template-columns: 70% 30%;
      column-gap: 32px;
    }
  }
`;

export default Cart;
