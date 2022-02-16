import { Add, Delete, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useNavigate } from "react-router";
import {
  clearCart,
  increaseProductQuantity,
  reduceProductQuantity,
  removeProduct,
} from "../redux/cartRedux";

import useGetTotalCartCost from "../customHooks/useGetTotalCartCost";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "5px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.div``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.div``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const { totalCartCost } = useGetTotalCartCost();

  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [product, setProduct] = useState(cart.products.product);

  const pushToCheckout = () => {
    navigate("/checkout", {
      state: {
        checkoutData: cart,
      },
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2) </TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton
            style={{ cursor: "pointer" }}
            onClick={() =>
              dispatch(
                clearCart({
                  cart,
                })
              )
            }
          >
            Clear Cart
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => {
              const disableReduceQuantity = product.quantity === 1;
              return (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b>
                        {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <IconButton
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(
                            increaseProductQuantity({
                              ...product,
                              quantity: product.quantity,
                              price: product.price * product.quantity,
                            })
                          )
                        }
                      >
                        <Add />
                      </IconButton>

                      <ProductAmount>{product.quantity} </ProductAmount>

                      <IconButton
                        disabled={disableReduceQuantity}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(
                            reduceProductQuantity({
                              ...product,
                              quantity: product.quantity,
                              price: product.price * product.quantity,
                            })
                          )
                        }
                      >
                        <Remove />
                      </IconButton>
                    </ProductAmountContainer>
                    <ProductPrice>
                      N{product.price * product.quantity}{" "}
                    </ProductPrice>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          removeProduct({ ...product, id: product._id })
                        );
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </PriceDetail>
                </Product>
              );
            })}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>N{totalCartCost}</SummaryItemPrice>
            </SummaryItem>
            <SummaryButton
              onClick={() => {
                pushToCheckout();
              }}
            >
              CHECKOUT NOW
            </SummaryButton>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Cart;
