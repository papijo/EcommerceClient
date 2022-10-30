import React from "react";
import { useDispatch } from "react-redux";
import { refresh } from "../redux/apiCalls";

const TestRefresh = () => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    refresh(dispatch);
  };

  return <button onClick={handleClick}>Refresh</button>;
};

export default TestRefresh;
