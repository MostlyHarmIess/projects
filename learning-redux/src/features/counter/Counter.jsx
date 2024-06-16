import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount, increment, decrement } from "./counterSlice";

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Counter</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
    </>
  );
}

export default Counter;
