import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/CartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { items: [], paymentMethod: "razonPay" };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { projects } = action.payload;
      const existingProject = state.items.find(
        (item) => item._id === projects._id
      );
      if (existingProject) {
        return state;
      } else {
        state.items.push(projects);
      }
      return updateCart(state);
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
