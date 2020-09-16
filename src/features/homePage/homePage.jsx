import React, { useEffect, Fragment } from "react";
import { getCurrentUser } from "./../../services/authService";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadFood } from "./homeSlice";
import Header from "../header/headerComp";
import "./homePage.css";
import Features from "./features";
import Items from "./items";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFood());
  });
  const foodItems = useSelector((state) => state.entities.home.food);

  if (!getCurrentUser()) return <Redirect to={"/login"} />;

  return (
    <Fragment>
      <Header />
      <Features />
      <div className="card-group">
        <Items foodItems={foodItems} />
      </div>
      {foodItems.map((item) => (
        <h1>{item.name}</h1>
      ))}
    </Fragment>
  );
};

export default HomePage;
