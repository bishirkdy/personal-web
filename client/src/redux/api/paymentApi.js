import { PAYMENT_URL } from "../constants";
import { createApiSlice } from "./api";

const paymentApi = createApiSlice.injectEndpoints({
  endpoints : (builder) => ({
    createPaymentIntent : builder.mutation({
        query : (body) => ({
            url : `${PAYMENT_URL}/create-payment-intent`,
            method : 'POST',
            body : body
        })
    })
  })
})

export const {useCreatePaymentIntentMutation} = paymentApi