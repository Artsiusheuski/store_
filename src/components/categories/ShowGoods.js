import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import addToCart from "./img/Common.png";
import { connect } from "react-redux";
import { increment } from "../../reduxStore/cartSlice";

class ShowGoods extends PureComponent {
  addToCart = (event) => {
    event.preventDefault();

    let goods = this.props.goods.find((item) => item.id === event.target.id);
    let setDefaultValue = [];
    let keyID = goods.id;

    for (let i = 0; i < goods.attributes.length; i++) {
      setDefaultValue.push({
        name: goods.attributes[i].name,
        value: goods.attributes[i].items[0].value,
      });
      keyID += (
        goods.attributes[i].name + goods.attributes[i].items[0].value
      ).toLowerCase();
    }

    this.props.increment({ goods, keyID, paramsGoods: setDefaultValue });
  };

  render() {
    return (
      <section className="wrapper_main_section">
        {this.props.goods.map((item, index) => (
          <div key={index}>
            <Link
              to={window.location.pathname === "/" ? "all/" + item.id : item.id}
            >
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
                  <span className="goods_info_img ">
                    <img src={item.gallery[0]} alt="goods" />
                  </span>
                </div>
                <div className="goods_for_addCart">
                  <div>
                    {item.brand} {item.name}
                    <h4>
                      {this.props.getCurrency}
                      {item.prices
                        .find(
                          (item) =>
                            item.currency.symbol === this.props.getCurrency
                        )
                        .amount.toFixed(2)}
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
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps())(ShowGoods);
