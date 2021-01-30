import React from "react";
import { useDispatch } from "react-redux";
import { categorizeFood } from "./homeSlice";

const Categories = ({ tabs, active }) => {
  const dispatch = useDispatch();
  return (
    <div className="row justify-content-around">
      <ul className="nav nav-tabs">
        {tabs.map((tab) => (
          <li className="nav-item">
            <a
              type="button"
              className={tab === active ? "nav-link active" : "nav-link"}
              onClick={() => dispatch(categorizeFood(tab))}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
