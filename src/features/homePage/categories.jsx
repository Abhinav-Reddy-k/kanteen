import React from "react";
import { useDispatch } from "react-redux";
import { categorizeFood } from "./homeSlice";

const Categories = ({ tabs }) => {
  const dispatch = useDispatch();
  return (
    <ul className="nav nav-tabs">
      {tabs.map((tab) => (
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={() => dispatch(categorizeFood(tab))}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
