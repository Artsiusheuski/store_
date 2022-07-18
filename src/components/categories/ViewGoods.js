import { React, Component } from "react";
import "./categories.css";
import { Link } from "react-router-dom";
import addToCart from "./img/Common.png";

export default class ViewGoods extends Component {
  // symbol = Reduxe Store/ SelectCurency
  constructor() {
    super();
    this.state = {
      addToCartBtn: "goods_button_cart_closed",
    };
  }

  linkToAll = () => {
    return window.location.pathname === "/"
      ? (window.location.pathname = "/all")
      : null;
  };

  render() {
    return (
      <section onClick={this.linkToAll} className="wrapper_main_section">
        {this.props.goods.map((item, index) => (
          <Link key={index} to={`${window.location.pathname}/${item.id}`}>
            <div
              className={
                Boolean(item.inStock) ? "goods_info" : "goods_info_oppacity"
              }
            >
              <div
                className={
                  !Boolean(item.inStock)
                    ? "goods_info_out"
                    : "goods_info_out_close"
                }
              >
                <p>out of stock</p>
                <img
                  src={item.gallery[0]}
                  alt="goods"
                  className="goods_info_img "
                />
              </div>
              <div className="goods_for_addCart">
                <div>
                  {item.brand} {item.name}
                  <h4>
                    {this.props.symbol}
                    {
                      item.prices.find(
                        (item) => item.currency.symbol === this.props.symbol
                      ).amount
                    }
                  </h4>
                </div>
                <div className={this.state.addToCartBtn}>
                  <img src={addToCart} alt="addToCart" title="Add to cart" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    );
  }
}
