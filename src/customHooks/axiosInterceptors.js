import axios from "axios";
import { useDispatch } from "react-redux";
import { publicRequest } from "./../requestMethods";
import { useEffect } from "react";

import React from "react";

const AxiosInterceptors = () => {
  const dispatch = useDispatch();
  axios.defaults.baseURL = `http://localhost:3005/api/`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  //Refresh token capture

  let refreshtoken = "";

  axios.interceptors.request.use(null, async (error) => {
    if (
      error.config &&
      error.response?.status === 403 && // Use the status code your server returns when token has expired
      !error.config.__isRetry
    ) {
      //Get another token

      if (localStorage.getItem("persist:root")) {
        refreshtoken = JSON?.parse(
          JSON?.parse(localStorage.getItem("persist:root"))?.user
        )?.currentUser?.refreshToken;
      }

      const res = await publicRequest.get(`/users/refresh`, {
        headers: { refreshtoken: refreshtoken },
      });

      const { accessToken, refreshToken } = res.data;
      dispatch(refreshtoken({ accessToken, refreshToken }));
    }
  });

  useEffect(() => {
    if (localStorage.getItem("persist:root")) {
      let token = "";
      token = JSON?.parse(
        JSON?.parse(localStorage.getItem("persist:root"))?.user
      )?.currentUser?.accessToken;
      axios.defaults.headers.common["token"] = `Bearer ${token}`;
    }
  }, []);
  return;
};

export default AxiosInterceptors;
