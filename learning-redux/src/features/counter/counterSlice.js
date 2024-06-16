import { createSlice } from "@reduxjs/toolkit";

//define initial state object for the slice
const initialState = {
  value: 0,
};

//input name, initial state and named functions
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  //define actions to be used on the slice of the store
  reducers: {
    increment: (state) => {
      //interact with state using the shape set in initialState
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// export a function to get the value out of the slice
export const selectCount = (state) => state.counter.value
//export the actions the slice allows
export const {increment, decrement} = counterSlice.actions

export default counterSlice.reducer
