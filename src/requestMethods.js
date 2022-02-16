import axios from "axios";

// const BASE_URL = "http://localhost:3001/api/";
const BASE_URL = "https://ecomestoreapi.herokuapp.com/api/";

const TOKEN =
  JSON?.parse(JSON?.parse(localStorage?.getItem("persist:root"))?.user)
    ?.currentUser?.accessToken || "";

// console.log(TOKEN);

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTA3OGM0YTBjYWEwM2JmNGU2NWNiMyIsImlzU3RhZmYiOnRydWUsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDYxMjk4MSwiZXhwIjoxNjQ0ODcyMTgxfQ.Fked8Am0oCcHVx4Fy44HUQv7LoXdCg70vlyMDm38tqM";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
