/* eslint-disable react-hooks/exhaustive-deps */
// import { useLocation } from "react-router";

// const Success = () => {
//   const location = useLocation();
//   console.log(location);
//   return <div>Successful</div>;
// };

// export default Success;

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import useGetTotalCartCost from "../customHooks/useGetTotalCartCost";
import { clearCart } from "../redux/cartRedux";
// import { useNavigate } from "react-router";

const Success = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  // // console.log(location);
  // //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)

  // const orderData = location.state.orderData;
  // console.log(location.state.products.products);
  // Array
  const { totalCartCost } = useGetTotalCartCost();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          email: currentUser.email,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            title: item.title,
            desc: item.desc,
          })),
          amount: cart.shipping.shippingCost + totalCartCost,
          address: cart.shipping.address,
          phone_number: cart.shipping.phone,
          extraNote: cart.shipping.extra,
          collector: cart.shipping.person,
        });
        setOrderId(res.data._id);
        // console.log(JSON.parse(localStorage.getItem("persist:root")).cart);

        // console.log(res.data);
      } catch {}
    };
    createOrder();
    dispatch(clearCart({ cart }));
    //set Cart State Here
  }, []);

  console.log(cart);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/">
        {" "}
        <button style={{ padding: 10, marginTop: 20 }}>Back to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
