import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import useGetTotalCartCost from "../customHooks/useGetTotalCartCost";
import { clearCart } from "../redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div``;
const ReviewWrapper = styled.div`
  align-items: center;
  justify-content: center;
`;
const ReviewOrder = styled.div`
  width: 30%;
  margin: auto;
`;

const ReviewHeading = styled.div`
  text-align: center;
  font-size: 25px;
  margin-bottom: 20px;
`;

const ReviewBodyOne = styled.div``;

const LineBody = styled.div`
  display: flex;
  font-size: 20px;
  margin-bottom: 20px;
`;
const LineBodyLeft = styled.div`
  flex: 1;
`;
const LineBodyRight = styled.div`
  flex: 1;
  text-align: right;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

const Review = () => {
  const { totalCartCost } = useGetTotalCartCost();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  // cart.products.map((item) => {
  //   return console.log(item.title, item.desc);
  // });
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference);

    navigate("/success");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log("closed");
    dispatch(
      clearCart({
        cart,
      })
    );
  };

  const config = {
    email: user.email,
    amount: (cart.shipping.shippingCost + totalCartCost) * 100,
    phone: cart.shipping.phone,
    first_name: user.firstname,
    last_name: user.lastname,
    publicKey: KEY,
    metadata: {
      userId: user._id,
      first_name: user.firstname,
      last_name: user.lastname,
      products: cart.products.map((item) => ({
        productId: item._id,
        quantity: item._quantity,
        title: item.title,
        desc: item.desc,
      })),
      amount: (cart.shipping.shippingCost + totalCartCost) * 100,
      address: cart.shipping.address,
    },
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ReviewWrapper>
          <ReviewOrder>
            <ReviewHeading>Confirm your Order</ReviewHeading>
            <ReviewBodyOne>
              <LineBody>
                <LineBodyLeft>Name:</LineBodyLeft>
                <LineBodyRight>
                  {user.lastname}
                  {user.firstname}{" "}
                </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>UserID:</LineBodyLeft>
                <LineBodyRight>{user._id} </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>Email:</LineBodyLeft>
                <LineBodyRight>{user.email} </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft> Cart Total</LineBodyLeft>
                <LineBodyRight>N{totalCartCost}</LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft> Shipping Fee</LineBodyLeft>
                <LineBodyRight>N{cart.shipping.shippingCost}</LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft> Shipping Fee</LineBodyLeft>
                <LineBodyRight>
                  N{cart.shipping.shippingCost + totalCartCost}
                </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>Delivery Address</LineBodyLeft>
                <LineBodyRight>{cart.shipping.address} </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>Receiver</LineBodyLeft>
                <LineBodyRight>{cart.shipping.person} </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>Phone Number</LineBodyLeft>
                <LineBodyRight>{cart.shipping.phone} </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>Extra Delivery Instructions</LineBodyLeft>
                <LineBodyRight>{cart.shipping.extra} </LineBodyRight>
              </LineBody>
              <Button
                onClick={() => {
                  initializePayment(onSuccess, onClose);
                }}
                type="filled"
              >
                Complete Order
              </Button>
            </ReviewBodyOne>
          </ReviewOrder>
        </ReviewWrapper>
      </Wrapper>
    </Container>
  );
};

export default Review;
