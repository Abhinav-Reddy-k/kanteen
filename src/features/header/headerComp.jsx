import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import {
  Container,
  Row,
  Column,
  Centered,
  Navbar,
  DesktopList,
} from "already-styled-components";
import { getCurrentUser } from "../../services/authService";

import "./styles.css";
import { useSelector } from "react-redux";
const TransparentDesktopList = styled(DesktopList)`
  display: flex;
  align-items: center;
  padding: 0 30px;

  &.fixed-top-enter {
    background-color: ${({ bc }) => bc};
  }
  &.fixed-top-enter-done {
    box-shadow: 1px 1px 3px 3px rgba(33, 33, 33, 0.1);
    background-color: white;
    color: black;
    transition: height 0.15s ease-out, background-color 0.15s ease-out;
    a {
      color: black;
    }
    path {
      fill: black;
    }
  }
  &.fixed-top-exit {
    background-color: white;
  }
  &.fixed-top-exit-done {
    background-color: ${({ bc }) => bc};
    transition: height 0.15s ease-in, background-color 0.15s ease-in;
  }
`;

const Brand = styled.div`
  font-size: 32px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-transform: uppercase;
`;

const BgImage = styled.div`
  height: 100vh;
  ${({ imageUrl }) =>
    `background: linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2)100%), url("${imageUrl}")`};
  background-size: cover;
  margin-top: -100px;
`;
const user = getCurrentUser();
const sugg = ["Milkshakes", "Manchuria", "Pani Puri"];
export default function Header() {
  const totalCartItems = useSelector((store) => store.entities.home.cart)
    .length;
  return (
    <Container fluid>
      <Navbar
        c="black"
        bc="grey"
        hc="brown"
        brand={<Brand>Kanteen</Brand>}
        desktopList={(props) => (
          <TransparentDesktopList
            {...props}
            mobileBreakpoint={1024}
            bc="transparent"
            c="white"
          />
        )}
      >
        <Link to="/profile">Profile</Link>
        <Link to="/cart">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-cart-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
            />
          </svg>
          <span className="badge">{totalCartItems}</span>
        </Link>
        <Link to="/logout">Logout</Link>
      </Navbar>
      <Row>
        <Column>
          <BgImage
            imageUrl={
              "https://twolovesstudio.com/wp-content/uploads/2015/01/Two-Loves-Studio-Mini-Raw-Cheesecakes-4.jpg"
            }
          >
            <Centered c="white" h="100%">
              <h1>
                Whats on your mind {user["name"].toUpperCase()} ?{" "}
                <TextLoop springConfig={{ stiffness: 180, damping: 8 }}>
                  <p>Icecreame</p>
                  <p>MilkShake</p>
                  <p>Panipuri</p>
                </TextLoop>
              </h1>
            </Centered>
          </BgImage>
        </Column>
      </Row>
    </Container>
  );
}
