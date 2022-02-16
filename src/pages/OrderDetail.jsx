import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div``;
const Title = styled.h2`
  text-align: center;
`;
const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
  margin-right: 300px;
  margin-left: 200px;
  font-size: 20px;
`;
const LeftSide = styled.div`
  flex: 1;
`;

const LeftTitle = styled.h3`
  text-align: center;
`;
const LeftBody = styled.div`
  background-color: teal;
`;
const LeftBodyTop = styled.div`
  margin-bottom: 20px;
`;
const LeftBodyItem = styled.div`
  display: flex;
  margin-top: 20px;
`;
const LeftBodyKey = styled.div`
  flex: 1;
`;
const LeftBodyValue = styled.div`
  flex: 1;
`;
const LeftBodyBottom = styled.div``;
const RightSide = styled.div`
  flex: 1;
  margin-left: 100px;
`;
const RightTitle = styled.h3`
  text-align: center;
`;
const RightBody = styled.div`
  background-color: teal;
`;
const RightBodyTop = styled.div``;
const RightBodyItem = styled.div`
  display: flex;
  margin-top: 20px;
`;
const RightItemKey = styled.div`
  flex: 1;
`;
const RightItemValue = styled.div``;

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const id = useSelector((state) => state?.user?.currentUser._id);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders/find/" + id);
        setOrders(res.data);
      } catch (error) {}
    };
    getOrders();
    // console.log(orders);
  }, [id]);

  const items = orders.filter((or) => {
    return or._id === orderId;
  });

  //
  const orderHistory = items[0];
  console.log(orderHistory?.products);
  return (
    <Container>
      <Navbar />
      <Title>Order Detail</Title>
      <Wrapper>
        <LeftSide>
          <LeftTitle>Customer Details</LeftTitle>
          <LeftBody>
            <LeftBodyTop>
              <LeftBodyItem>
                <LeftBodyKey>User Id</LeftBodyKey>
                <LeftBodyValue>{orderHistory?.userId} </LeftBodyValue>
              </LeftBodyItem>
              <LeftBodyItem>
                <LeftBodyKey>Email</LeftBodyKey>
                <LeftBodyValue>{orderHistory?.email} </LeftBodyValue>
              </LeftBodyItem>
            </LeftBodyTop>
            <LeftBodyBottom>
              <LeftTitle>Product Details</LeftTitle>
              <LeftBodyItem>
                <LeftBodyKey>User Id</LeftBodyKey>
                <LeftBodyValue>{orderHistory?.userId} </LeftBodyValue>
              </LeftBodyItem>
              {orderHistory?.products?.map((product) => {
                return (
                  <>
                    <LeftBodyItem key={product._id}>
                      <LeftBodyKey>Product </LeftBodyKey>
                      <LeftBodyValue>{product.title} </LeftBodyValue>
                    </LeftBodyItem>
                    <LeftBodyItem>
                      <LeftBodyKey>Product Quantity </LeftBodyKey>
                      <LeftBodyValue>{product.quantity} </LeftBodyValue>
                    </LeftBodyItem>
                  </>
                );
              })}
            </LeftBodyBottom>
          </LeftBody>
        </LeftSide>
        <RightSide>
          <RightTitle>Delivery Details</RightTitle>
          <RightBody>
            <RightBodyTop>
              <RightBodyItem>
                <RightItemKey> Recipient:</RightItemKey>
                <RightItemValue>{orderHistory?.collector} </RightItemValue>
              </RightBodyItem>
              <RightBodyItem>
                <RightItemKey> Delivery Address:</RightItemKey>
                <RightItemValue>{orderHistory?.address} </RightItemValue>
              </RightBodyItem>
              <RightBodyItem>
                <RightItemKey> Phone Number:</RightItemKey>
                <RightItemValue>{orderHistory?.phone_number} </RightItemValue>
              </RightBodyItem>
              <RightBodyItem>
                <RightItemKey> Extra Delivery:</RightItemKey>
                <RightItemValue>{orderHistory?.extraNote} </RightItemValue>
              </RightBodyItem>
            </RightBodyTop>
          </RightBody>
        </RightSide>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default OrderDetail;
