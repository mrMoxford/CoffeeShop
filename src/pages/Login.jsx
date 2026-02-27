import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginBg from "../assets/CoffeeImgs/LoginBg.png";
import { tabletDevice, smallDevice } from "../Responsive";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../Redux/auth/authSlice";
import Spinner from "../components/Spinner";
const Container = styled.div`
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  color: black;
  ${smallDevice({ padding: "1rem" })}
`;
const Imagesection = styled.div`
  flex: 1;
  height: 100%;
  background: url(${LoginBg});
  background-repeat: no-repeat;
  background-size: cover;
  ${tabletDevice({ display: "none" })}
`;
const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  background: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  width: 50%;
  ${smallDevice({ width: "100%" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 50%;
  ${smallDevice({ width: "100%" })}
`;
const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  color: white;
  background: hsla(360, 65%, 20%, 1);
  border: none;
  cursor: pointer;
`;
const Message = styled.span`
  color: red;
`;
const ALink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 0.8rem;
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isFetching, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ username, password }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Wrapper>
        <Title> Login To Your Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isError && <Message>Something went wrong</Message>}
          <Button className="login">Log In</Button>
          <ALink className="forgotten-password">Forgot your password?</ALink>
          <ALink to="/signup" className="signup">
            Don't have an account?{" "}
          </ALink>
        </Form>
      </Wrapper>
      <Imagesection></Imagesection>
    </Container>
  );
};

export default Login;
