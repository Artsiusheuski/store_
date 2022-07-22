import React from "react";
import { Component } from "react";

export default class FormGoods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goodsParams: {},
    };
    console.log(this.props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(event) {
    event.preventDefault();
    let params = event.target.elements;
    let countCheck = [];
    let countName = [];
    let boxNames;
    let goods = [this.props.nameGood];

    for (let i = 0; i < params.length; i++) {
      if (params[i].name) {
        countName.push(params[i].name);
        boxNames = new Set(countName);
      }
      if (params[i].checked) {
        countCheck.push(params[i].checked);
        goods.push(params[i].name, params[i].value);
      }
    }

    if (countCheck.length === boxNames.size) {
      this.setState({ goodsParams: { ...goods } });
    } else {
      alert("You must select all options");
    }
  }

  render() {
    return (
      <form name="formGoods" onSubmit={this.addToCart} action="">
        {console.log(this.state.goodsParams)}
        {this.props.goodsAttributes.map((item, index) => (
          <div className="goods_descriptions_check" key={index}>
            <p className="goods_font_label">{(this.name = item.name)} :</p>
            <div className="goods_descriptions_check_box">
              {item.items.map((item, index) => (
                <label id={this.name} key={index}>
                  <input
                    className={
                      item.value.includes("#")
                        ? "goods_descriptions_check_color"
                        : "goods_descriptions_check_items"
                    }
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
          <span>$ {this.props.goodsPrices}</span>
          {/* needed get to symbol for amount */}
          <button className="goods_descriptions_btn" type="submit">
            ADD TO CART
          </button>
        </div>
      </form>
    );
  }
}
