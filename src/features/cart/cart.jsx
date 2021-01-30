import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
                    <a
                      onClick={() => dispatch(emptyCart())}
                      className="update round-black-btn"
                      title=""
                    >
                      Empty Cart
                    </a>
                    <hr />
                    <a href="#" className="checkout round-black-btn" title="">
                      <Link to="/order">Place Order</Link>
                    </a>
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
