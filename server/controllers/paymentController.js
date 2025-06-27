import { CustomError } from "../utils/errorUtils.js";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(
      new CustomError(`Error creating checkout section: ${error.message}`, 400)
    );
  }
};
