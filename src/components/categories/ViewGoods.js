import { React, Component } from "react";
import "./categories.css";
import { Link } from "react-router-dom";
import addToCart from "./img/Common.png";
import { connect } from "react-redux";
import { increment } from "../../store/cartSlice";

class ViewGoods extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  linkToAll = () => {
    window.location.pathname === "/" && (window.location.pathname = "/all");
  };

  addToCart = (event) => {
    event.preventDefault();
    this.props.increment(event.target.id); // add goods from redux-store,with help action
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
                    {this.props.getCurrency}
                    {
                      item.prices.find(
                        (item) =>
                          item.currency.symbol === this.props.getCurrency
                      ).amount
                    }
                  </h4>
                </div>
                <div className="goods_button_cart">
                  <img
                    onClick={this.addToCart}
                    src={addToCart}
                    alt="AddToCart"
                    id={item.id}
                    title="Add to cart"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    );
  }
}

const mapDispatchToProps = () => ({
  increment,
});
const mapStateToProps = (state) => ({
  getCurrency: state.currency.value,
});

export default connect(mapStateToProps, mapDispatchToProps())(ViewGoods);
