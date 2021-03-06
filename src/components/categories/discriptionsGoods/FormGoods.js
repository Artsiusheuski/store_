import React from "react";
import { Component } from "react";
import { increment } from "../../../store/cartSlice";
import { connect } from "react-redux";

class FormGoods extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(event) {
    event.preventDefault();
    let setParams = [];
    const getParams = event.target.elements;
    for (let i = 0; i < getParams.length; i++) {
      if (getParams[i].checked) {
        setParams.push({ name: getParams[i].name, value: getParams[i].value });
      }
    }

    const goods = {
      goods: this.props.goods,
      paramsGoods: setParams,
    };
    this.props.increment(goods);
  }

  render() {
    return (
      <form onSubmit={this.addToCart} action="">
        {this.props.goodsAttributes.map((item, index) => (
          <div className="goods_descriptions_check" key={index}>
            <p className="goods_font_label">{(this.name = item.name)} :</p>
            <div className="goods_descriptions_check_box">
              {item.items.map((item) => (
                <label key={item.id}>
                  <input
                    className={
                      item.value.includes("#")
                        ? "goods_descriptions_check_color"
                        : "goods_descriptions_check_items"
                    }
                    defaultChecked
                    name={this.name}
                    type="radio"
                    value={item.value}
                    style={{
                      backgroundColor: item.value.includes("#") && item.value,
                    }}
                  />
                  <span>{!item.value.includes("#") && item.value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="goods_descriptions_check_down">
          <h4 className="goods_font_label">Price:</h4>
          <span>
            {this.props.getCurrency}{" "}
            {this.props.goodsPrices.length &&
              this.props.goodsPrices.find(
                (item) => item.currency.symbol === this.props.getCurrency
              ).amount}
          </span>
        </div>
        <div>
          <button className="goods_descriptions_btn" type="submit">
            ADD TO CART
          </button>
        </div>
      </form>
    );
  }
}
const mapDispatchToProps = () => ({
  increment,
});
const mapStateToProps = (state) => ({
  getCurrency: state.currency.value,
});

export default connect(mapStateToProps, mapDispatchToProps())(FormGoods);
