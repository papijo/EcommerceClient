import axios from "axios";

// const BASE_URL = "https://ecomestoreapi.herokuapp.com/api/";
const BASE_URL = "http://localhost:3002/api/"
// const TOKEN =
//   JSON?.parse(JSON?.parse(localStorage?.getItem("persist:root"))?.user)
//     ?.currentUser?.accessToken || "";

// console.log(TOKEN);
let TOKEN = "";

if (localStorage.getItem("persist:root")) {
  TOKEN = JSON?.parse(JSON?.parse(localStorage.getItem("persist:root"))?.user)
    ?.currentUser?.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
