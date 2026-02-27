import styled from "styled-components";
import { CgCloseO } from "react-icons/cg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { smallDevice, tabletDevice } from "../Responsive";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../Redux/auth/authSlice";

const Container = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  position: fixed;
  z-index: 999;
  background: hsla(104, 28%, 15%, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
  font-size: 1rem;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftCol = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 200;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  margin: 0;
  padding: 0;
  ${smallDevice({ fontSize: "1.5rem" })}
`;
const LogoSmall = styled(Logo)`
  color: white;
`;
const CenterCol = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${tabletDevice({ display: "none" })}
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  padding: 0;

  text-transform: uppercase;
  list-style: none;
`;

const Nav = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  &.active {
    color: red;
  }
`;
const NavMini = styled(Nav)`
  color: white;
`;
const RightCol = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-transform: uppercase;
  ${tabletDevice({ display: "none" })}
`;
const Logout = styled.button`
  background: transparent;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  color: ${props => props.type === "navLogout" && "white"};
`;
const NavOpen = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: none;
  justify-content: flex-end;
  align-items: center;
  ${tabletDevice({ display: "flex" })}
  ${smallDevice({ right: "1rem" })}
`;
const NavMenuSmall = styled.div`
  position: absolute;
  inset: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: hsla(104, 28%, 15%, 1);
`;
const NavClose = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  ${smallDevice({ right: "1rem" })}
`;
const NavLogoContainer = styled.div`
  position: absolute;
  top: .5rem;
  left: 1rem;
  ${smallDevice({ left: "1rem" })}
`;
const NavListSmall = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 2rem;
`;

const NavBar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const quantity = useSelector(state => state.cart?.cartQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <LeftCol>
          {" "}
          <Logo to="/" className="logo">
            ODESSY_JAVA
          </Logo>
        </LeftCol>
        <CenterCol>
          <NavList>
            <Nav to="/" className="home">
              Home
            </Nav>
            <Nav to="/regions" className="explore">
              Explore
            </Nav>
            <Nav to="/Store" className="store">
              Store
            </Nav>
          </NavList>
        </CenterCol>
        <RightCol>
          <Badge badgeContent={quantity} color="warning">
            <Nav to="/cart" className="cart">
              <RiShoppingBasket2Line color="white" size={"2rem"} />
            </Nav>
          </Badge>
          {user ? (
            <Logout onClick={handleLogout} className="logout">
              Logout
            </Logout>
          ) : (
            <>
              <Nav to="/login" className="login">
                Login
              </Nav>
              <Nav to="/signup" className="signup">
                Signup
              </Nav>
            </>
          )}
        </RightCol>
      </Wrapper>
      <NavOpen onClick={() => setMenuToggle(true)} className="menu-open">
        <HiOutlineMenuAlt3 color="white" size={30} />
      </NavOpen>
      {menuToggle && (
        <NavMenuSmall>
          <NavClose onClick={() => setMenuToggle(false)} className="menu-close">
            <CgCloseO color="white" size={30} />
          </NavClose>
          <NavLogoContainer>
            <LogoSmall
              onClick={() => setMenuToggle(false)}
              to="/"
              className="logo"
            >
              ODESSY_JAVA
            </LogoSmall>
          </NavLogoContainer>
          <NavListSmall>
            <NavMini
              onClick={() => setMenuToggle(false)}
              to="/"
              className="home"
            >
              Home
            </NavMini>
            <NavMini
              onClick={() => setMenuToggle(false)}
              to="/regions"
              className="explore"
            >
              Explore
            </NavMini>
            <NavMini
              onClick={() => setMenuToggle(false)}
              to="/store"
              className="store"
            >
              Store
            </NavMini>

            <NavMini to="/cart">
              <Badge
                badgeContent={quantity}
                onClick={() => setMenuToggle(false)}
                color="warning"
                className="cart"
              >
                <RiShoppingBasket2Line color="white" size={"2rem"} />
              </Badge>
            </NavMini>

            {user ? (
              <Logout
                type="navLogout"
                onClick={handleLogout}
                className="logout"
              >
                Logout
              </Logout>
            ) : (
              <>
                <NavMini
                  to="/login"
                  onClick={() => setMenuToggle(false)}
                  className="login"
                >
                  Login
                </NavMini>
                <NavMini
                  to="/signup"
                  onClick={() => setMenuToggle(false)}
                  className="signup"
                >
                  Signup
                </NavMini>
              </>
            )}
          </NavListSmall>
        </NavMenuSmall>
      )}
    </Container>
  );
};

export default NavBar;
