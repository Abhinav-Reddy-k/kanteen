import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  emptyCart,
  getCart,
  getFoodItems,
  removeCart,
  setQuantity,
} from "../homePage/homeSlice";
import "./cart.css";

function Cart() {
  const cart = useSelector(getCart);
  const food = useSelector(getFoodItems);
  const dispatch = useDispatch();
  let totalPrice = 0;

  let cartData = cart.map((obj) => {
    let itemId = obj.item;
    let foodItem = food.filter((i) => i._id == itemId);
    return { ...obj, item: foodItem };
  });

  const pieChartData = {
    labels: cartData.map((obj) => obj.item[0].name),
    datasets: [
      {
        label: "# of Votes",
        data: cartData.map((obj) => obj.item[0].price * obj.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Fragment>
      <div className="cart-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="main-heading">Shopping Cart</div>
              <div className="table-cart">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((obj) => {
                      let data = food.filter((item) => item._id === obj.item);
                      let qtyminusStyle =
                        obj.quantity === 1 ? { pointerEvents: "none" } : {};
                      totalPrice += data[0].price * obj.quantity;
                      return (
                        <tr>
                          <td>
                            <div className="display-flex align-center">
                              <div className="img-product">
                                <img
                                  src={data[0].url}
                                  className="mCS_img_loaded"
                                />
                              </div>
                              <div className="name-product">
                                {data[0].name}
                                <br />
                              </div>
                              <div className="price">{data[0].price}</div>
                            </div>
                          </td>
                          <td className="product-count">
                            <form action="#" className="count-inlineflex">
                              <div
                                style={qtyminusStyle}
                                onClick={() =>
                                  dispatch(
                                    setQuantity(obj.item, obj.quantity - 1)
                                  )
                                }
                                className="qtyminus"
                              >
                                -
                              </div>
                              <input
                                type="text"
                                name="quantity"
                                value={obj.quantity}
                                className="qty"
                              />
                              <div
                                onClick={() =>
                                  dispatch(
                                    setQuantity(obj.item, obj.quantity + 1)
                                  )
                                }
                                className="qtyplus"
                              >
                                +
                              </div>
                            </form>
                          </td>
                          <td>
                            <div className="total">
                              {data[0].price * obj.quantity}
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm"
                              onClick={() => dispatch(removeCart(obj.item))}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="coupon-box">
                  <form action="#" method="get" accept-charset="utf-8">
                    <div className="coupon-input">
                      <input
                        type="text"
                        name="coupon code"
                        placeholder="Coupon Code"
                      />
                      <button type="submit" className="round-black-btn">
                        Apply Coupon
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart-totals">
                <h3>Cart Totals</h3>
                <form action="#" method="get" accept-charset="utf-8">
                  <table>
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td className="subtotal">{totalPrice}</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td className="free-shipping">Free Shipping</td>
                      </tr>
                      <tr className="total-row">
                        <td>Total</td>
                        <td className="price-total">{totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="btn-cart-totals">
                    <button
                      onClick={() => dispatch(emptyCart())}
                      className="update round-black-btn"
                      title=""
                    >
                      Empty Cart
                    </button>
                    <hr />
                    <Link
                      className="checkout round-black-btn"
                      to="/orderPreview"
                    >
                      Place Order
                    </Link>
                  </div>
                  <div className="m-4">
                    <Pie data={pieChartData} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
