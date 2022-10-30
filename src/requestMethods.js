import axios from "axios";
import jwt_decode from "jwt-decode";
import { refresh } from "./redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/userRedux";

const BASE_URL = "http://localhost:3005/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,headers:{
//     token:`Bearer ${TOKEN}`
//   }
// });

const newRefresh = async (dispatch, instance) => {
  // window.location.reload();
  const res = await instance.post("/users/refresh");
  dispatch(refreshToken(res.data));

  return res.data;
};

export const useUserRequest = () => {
  const user = useSelector((state) => state?.user?.currentUser) || null;
  const dispatch = useDispatch();
  console.log("OLD TOKEN", user?.accessToken);
  let instance = axios.create({
    baseURL: BASE_URL,

    headers: {
      token: `Bearer ${user?.accessToken}`,
      refreshtoken: user?.refreshToken,
      id: user?._id,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      // && !prevRequest?.sent
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        console.log(error?.response);
        const res = await newRefresh(dispatch, instance);
        window.location.reload();
        console.log("NEW TOKEN", res?.accessToken);
      }
      return Promise.reject(error);
    }
  );

  return { instance };
};

// const GetRefreshToken = async () => {
//   const res = await publicRequest.post("/users/refresh");
//   let response = {
//     accessToken: res.data.accessToken,
//     refreshToken: res.data.refreshToken,
//   };
//   // console.log(response);

//   return response;
// };

// export const UseAxiosInterceptors = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state?.user?.currentUser);
//   useEffect(() => {
//     const reqIntercept = userRequest.interceptors.request.use(
//       async (config) => {
//         // let currentDate = new Date();
//         // const decodedToken = jwt_decode(refreshToken);
//         // if (decodedToken.exp * 1000 < currentDate.getTime()) {
//         //   // const data = GetRefreshToken();
//         //   config.headers["token"] = `Bearer ${TOKEN}`;
//         // }

//         if (!config.headers["Authorization"]) {
//           config.headers["token"] = `Bearer ${TOKEN}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     const resIntercept = userRequest.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error?.config;
//         // && !prevRequest?.sent
//         if (error?.response?.status === 403 && !prevRequest?.sent) {
//           // prevRequest.sent = true;
//           // const res = await GetRefreshToken();
//           const res = await refresh(dispatch);
//           prevRequest.headers["token"] = `Bearer ${res.data.accessToken}`;
//           console.log(prevRequest);
//           return userRequest(prevRequest);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       userRequest.interceptors.request.eject(reqIntercept);
//       userRequest.interceptors.request.eject(resIntercept);
//     };
//   }, [dispatch, user]);

//   return userRequest;
// };
