import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import { clearCart } from "../redux/cartRedux";

//General Container
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "55px" })}
  ${tablet({ height: "60px" })}
`;

//Wrapper
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px", marginTop: "5px" })}
  ${tablet({ padding: "10px 10px" })}
`;
//Left Side of Navbar
const Left = styled.div`
  flex: 1;
  display: flex;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  /* @media only screen and (max-width: 380px){
        display: none;
    } */
  ${mobile({ display: "none" })}
  ${tablet({ marginLeft: "20px" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  ${tablet({ width: "100px" })}
`;

//Center Side of Navbar
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  text-decoration: none;
  ${mobile({ fontSize: "15px", marginLeft: "5px" })}
  ${tablet({ fontSize: "20px" })}
`;

//Right Side of Navbar
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  color: black;
  ${mobile({ fontSize: "14px", marginLeft: "5px" })}
  ${tablet({ fontSize: "14px", marginLeft: "5px", marginRight: "5px" })}
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  ${mobile({ width: "30px", height: "30px", marginRight: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout);
    dispatch(clearCart({ cart }));
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              {" "}
              ECOM SHOP.
            </Link>
          </Logo>
        </Center>
        <Right>
          {user ? (
            <Avatar src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
          ) : (
            <Link className="link" to="/register">
              <MenuItem>REGISTER</MenuItem>
            </Link>
          )}

          {user !== null ? (
            <MenuItem onClick={handleLogout}>SIGN OUT</MenuItem>
          ) : (
            <Link className="link" to="/login">
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
