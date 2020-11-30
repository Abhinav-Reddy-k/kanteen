import React, { Fragment } from "react";
import "./cart.css";

function Cart() {
  return (
    <Fragment>
      <div className="container">
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-md-9">
              <div className="ibox">
                <div className="ibox-title">
                  <span className="pull-right">
                    (<strong>5</strong>) items
                  </span>
                  <h5>Items in your cart</h5>
                </div>
                <div className="ibox-content">
                  <div className="table-responsive">
                    <table className="table shoping-cart-table">
                      <tbody>
                        <tr>
                          <td width="90">
                            <div className="cart-product-imitation"></div>
                          </td>
                          <td className="desc">
                            <h3>
                              <a href="#" className="text-navy">
                                Desktop publishing software
                              </a>
                            </h3>
                            <p className="small">
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. The point of using
                              Lorem Ipsum is
                            </p>
                            <dl className="small m-b-none">
                              <dt>Description lists</dt>
                              <dd>
                                A description list is perfect for defining
                                terms.
                              </dd>
                            </dl>

                            <div className="m-t-sm">
                              <a href="#" className="text-muted">
                                <i className="fa fa-gift"></i> Add gift package
                              </a>
                              |
                              <a href="#" className="text-muted">
                                <i className="fa fa-trash"></i> Remove item
                              </a>
                            </div>
                          </td>

                          <td>
                            $180,00
                            <s className="small text-muted">$230,00</s>
                          </td>
                          <td width="65">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="1"
                            />
                          </td>
                          <td>
                            <h4>$180,00</h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="ibox-content">
                  <button className="btn btn-primary pull-right">
                    <i className="fa fa fa-shopping-cart"></i> Checkout
                  </button>
                  <button className="btn btn-white">
                    <i className="fa fa-arrow-left"></i> Continue shopping
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="ibox">
                <div className="ibox-title">
                  <h5>Cart Summary</h5>
                </div>
                <div className="ibox-content">
                  <span>Total</span>
                  <h2 className="font-bold">$390,00</h2>

                  <hr />
                  <span className="text-muted small">
                    *For United States, France and Germany applicable sales tax
                    will be applied
                  </span>
                  <div className="m-t-sm">
                    <div className="btn-group">
                      <a href="#" className="btn btn-primary btn-sm">
                        <i className="fa fa-shopping-cart"></i> Checkout
                      </a>
                      <a href="#" className="btn btn-white btn-sm">
                        {" "}
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ibox">
                <div className="ibox-title">
                  <h5>Support</h5>
                </div>
                <div className="ibox-content text-center">
                  <h3>
                    <i className="fa fa-phone"></i> +43 100 783 001
                  </h3>
                  <span className="small">
                    Please contact with us if you have any questions. We are
                    avalible 24h.
                  </span>
                </div>
              </div>

              <div className="ibox">
                <div className="ibox-content">
                  <p className="font-bold">
                    Other products you may be interested
                  </p>
                  <hr />
                  <div>
                    <a href="#" className="product-name">
                      {" "}
                      Product 1
                    </a>
                    <div className="small m-t-xs">
                      Many desktop publishing packages and web page editors now.
                    </div>
                    <div className="m-t text-righ">
                      <a
                        href="#"
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        Info <i className="fa fa-long-arrow-right"></i>{" "}
                      </a>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <a href="#" className="product-name">
                      {" "}
                      Product 2
                    </a>
                    <div className="small m-t-xs">
                      Many desktop publishing packages and web page editors now.
                    </div>
                    <div className="m-t text-righ">
                      <a
                        href="#"
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        Info <i className="fa fa-long-arrow-right"></i>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
