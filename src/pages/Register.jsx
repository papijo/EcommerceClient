import React, { useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useNavigate } from "react-router";
import { publicRequest } from "../requestMethods";
import Notification from "../components/Notification";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  ${tablet({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const SignInContainer = styled.div`
  margin-top: 25px;
`;

const ButtonTwo = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 15px;
`;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        password === confirmPassword &&
        password !== "" &&
        firstname !== "" &&
        lastname !== "" &&
        email !== ""
      ) {
        publicRequest
          .post("/auth/register", {
            firstname,
            lastname,
            username,
            password,
            email,
          })
          .then(
            (response) => {
              // console.log(response.data);
              navigate("/login");
            },
            (error) => {
              setErrorMessage(error?.response?.data?.message);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }
          );
      } else {
        setErrorMessage("Enter Credentials Properly!!!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
      setFirstname("");
      setLastname("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
    } catch (error) {}
  };

  const signin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>{" "}
        <Form onSubmit={handleSubmit}>
          {/* Add onSubmit Function to Form */}
          <Input
            placeholder="First Name"
            value={firstname}
            onChange={({ target }) => setFirstname(target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastname}
            onChange={({ target }) => setLastname(target.value)}
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
          <Notification message={errorMessage} />

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>

          <Button type="submit">CREATE</Button>
        </Form>
        <SignInContainer>
          <Title>Sign In if you already have an account</Title>
          <ButtonTwo onClick={signin}>Sign In</ButtonTwo>
        </SignInContainer>
      </Wrapper>
    </Container>
  );
};

export default Register;
