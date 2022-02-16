import axios from "axios";

const BASE_URL = "https://ecomestoreapi.herokuapp.com/api/";

// const TOKEN =
//   JSON?.parse(JSON?.parse(localStorage?.getItem("persist:root"))?.user)
//     ?.currentUser?.accessToken || "";

// console.log(TOKEN);

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTA3OGM0YTBjYWEwM2JmNGU2NWNiMyIsImlzU3RhZmYiOnRydWUsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTAwNzY0M30.cOfKVsiKTL4IAVWCmqPRmQPlNm6vzKnhX7gI_7rUd1s";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
