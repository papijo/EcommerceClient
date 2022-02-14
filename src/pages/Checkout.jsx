import React, { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import stateCost from "../data/shippingCost";
import { updateShippingInfo } from "../redux/cartRedux";
import useGetTotalCartCost from "../customHooks/useGetTotalCartCost";

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

const ReviewBodyTwo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewHeadingTwo = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 25px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

// const Select = styled.select``;
// const Option = styled.option``;

const Checkout = () => {
  const { totalCartCost } = useGetTotalCartCost();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [person, setPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [extra, setExtra] = useState("");
  const [dest, setDest] = useState("");
  const [shippingCost, setShippingCost] = useState("");

  const navigate = useNavigate();

  // const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  // console.log(user.currentUser);

  const proceedToReview = () => {
    dispatch(
      updateShippingInfo({ shippingCost, dest, address, person, phone, extra })
    );

    navigate("/review");
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ReviewWrapper>
          <ReviewOrder>
            <ReviewHeading>Complete your Order</ReviewHeading>
            <ReviewBodyOne>
              <LineBody>
                <LineBodyLeft>Name</LineBodyLeft>
                <LineBodyRight>
                  {user.currentUser?.lastname} {user.currentUser?.firstname}
                </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>UserID</LineBodyLeft>
                <LineBodyRight>{user.currentUser?._id} </LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>Email</LineBodyLeft>
                <LineBodyRight>{user.currentUser?.email}</LineBodyRight>
              </LineBody>
              <LineBody>
                <LineBodyLeft>Product Total</LineBodyLeft>
                <LineBodyRight>N{totalCartCost}</LineBodyRight>
              </LineBody>
              <hr />
            </ReviewBodyOne>
            <ReviewHeadingTwo>Enter Shipping Details</ReviewHeadingTwo>
            <ReviewBodyTwo>
              <Select
                sx={{ m: 1 }}
                placeholder="State"
                onChange={({ target }) => {
                  setDest(target.value?.state);
                  setShippingCost(target.value?.price);
                }}
              >
                <MenuItem key={Math.random()} value={0}>
                  Select state
                </MenuItem>
                {stateCost.map((item) => (
                  <MenuItem
                    selected={item?.price === dest?.price}
                    key={Math.random()}
                    value={item}
                  >
                    {item.state}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                sx={{ m: 1 }}
                placeholder="Delivery Address"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
                multiline
                rows={4}
              />
              <TextField
                placeholder="Contact Person"
                sx={{ m: 1 }}
                value={person}
                onChange={({ target }) => setPerson(target.value)}
              />
              <TextField
                sx={{ m: 1 }}
                placeholder="Phone Number"
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
              <TextField
                sx={{ m: 1 }}
                placeholder="Extra Instructions"
                value={extra}
                onChange={({ target }) => setExtra(target.value)}
                multiline
                rows={4}
              />
              <Button
                onClick={() => {
                  proceedToReview();
                }}
              >
                Proceed to Checkout
              </Button>
            </ReviewBodyTwo>
          </ReviewOrder>
        </ReviewWrapper>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
