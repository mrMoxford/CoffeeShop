import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SignUpBg from "../assets/CoffeeImgs/SignUpBg.png";
import { tabletDevice, smallDevice } from "../Responsive";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { signup, reset } from "../Redux/auth/authSlice";
import Spinner from "../components/Spinner";
const Container = styled.div`
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  color: black;
  ${smallDevice({ padding: "1rem" })};
`;
const Imagesection = styled.div`
  flex: 1;
  height: 100%;
  background: url(${SignUpBg});
  background-repeat: no-repeat;
  background-size: cover;
  ${tabletDevice({ display: "none" })};
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
const Agreement = styled.span`
  color: hsla(0, 0%, 0%, 0.5);
  font-size: 0.5rem;
`;
const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  color: white;
  background: hsla(104, 28%, 15%, 1);
  border: none;
  cursor: pointer;
`;
const ALink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 0.8rem;
`;
const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      dispatch(signup({ name, username, email, password }));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Imagesection></Imagesection>
      <Wrapper>
        <Title> Create Your Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="name"
          />
          <Input
            id="username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
          />
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
          />
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
          />
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
          />
          <Agreement>
            We collect and use your personal information solely to fulfill your
            orders and provide you with our services, and we do not share your
            information with any third parties, as your privacy is important to
            us.
          </Agreement>
          <Button className="signup">Sign Up</Button>
          <ALink to="/login" className="login">
            {" "}
            Already have an account?
          </ALink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
