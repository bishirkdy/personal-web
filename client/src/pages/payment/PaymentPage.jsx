import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement  } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreatePaymentIntentMutation } from "../../redux/api/paymentApi";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(elements);

  const totalPrice = location?.state?.totalPrice ?? 0;

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [newPayment, { isLoading: isCreatingPaymentIntent }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!totalPrice || totalPrice <= 0) {
        setError("Invalid total price");
        return;
      }
      try {
        const res = await newPayment({
          amount: totalPrice * 100,
          currency: "inr",
        });
        if (res?.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          setError("Error fetching client secret");
        }
      } catch (err) {
        setError("Error fetching payment intent");
      }
    };

    fetchClientSecret();
  }, [totalPrice, newPayment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe is not ready");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!clientSecret) {
      setError("No client secret available");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: stripeError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setSuccess("Payment successful!");
      setProcessing(false);
      navigate("/");
    }
  };

  return (
    <div className="w-full h-full bg-[var(--color-primary)] py-30">
      <div className="max-w-md mx-auto p-6 shadow rounded ">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        {isCreatingPaymentIntent && (
          <p className="text-gray-500 mb-2">Setting up payment...</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            className="p-3 border rounded"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />

          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className={`w-full py-2 rounded-lg font-semibold text-white bg-[var(--color-secondary)] cursor-pointer ${
              processing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] border border-[var(--color-secondary)]"
            }`}
          >
            {processing ? "Processing..." : `Pay ₹${totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
