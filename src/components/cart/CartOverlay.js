import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./cartOverlay.css";
import "../categories/discriptionsGoods/discriptionsGoods.css";
import { dicrement, increment } from "../../reduxStore/cartSlice";
import Total from "./Total";
import SwitcherGallery from "./SwitcherGallery";
class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.getParams = this.getParams.bind(this);
  }

  getParams = (key, nameAttributes) => {
    let filtAtr = this.props.getGoods.find((item) => item.keyID === key);
    let filtValue = filtAtr.paramsGoods.find(
      (item) => item.name === nameAttributes
    );
    return filtValue.value;
  };

  totalSumm = () => {
    let box = this.props.getGoods.map(
      (item) =>
        item.goods.prices.find(
          (item) => item.currency.symbol === this.props.getCurrency
        ).amount * this.props.count[item.keyID]
    );
    let total = box.length > 0 && box.reduce((a, b) => a + b);
    return total % 1 === 0 ? total.toFixed(0) : total.toFixed(2);
  };

  render() {
    return (
      <>
        {this.props.getGoods.map((item) => (
          <div key={item.keyID} className="wrapper_cart_discriptions_goods">
            <div className="wrapper_cart_goods_params">
              <h3 className="cart_goods_params_title">{item.goods.name}</h3>
              <h3>{item.goods.brand}</h3>
              <h4>
                <span> {this.props.getCurrency}</span>
                {item.goods.prices
                  .find(
                    (item) => item.currency.symbol === this.props.getCurrency
                  )
                  .amount.toFixed(2) *
                  this.props.count[(this.keyID = item.keyID)]}
              </h4>
              <div>
                {item.goods.attributes.map((item, index) => (
                  <form
                    action="*"
                    className="goods_descriptions_check cartOverlay_check"
                    key={index}
                  >
                    <p className="goods_params_title">
                      {(this.name = item.name)} :
                    </p>

                    <div id="no_wrap" className="goods_descriptions_check_box">
                      {item.items.map((item) => (
                        <label className="cartOverlay_for_label" key={item.id}>
                          <input
                            className={
                              item.value.includes("#")
                                ? "cartOverlay_check_color"
                                : "cartOverlay_check_items"
                            }
                            defaultChecked={
                              item.value ===
                              this.getParams(this.keyID, this.name)
                            }
                            disabled
                            name={this.name}
                            type="radio"
                            style={{
                              backgroundColor:
                                item.value.includes("#") && item.value,
                            }}
                          />
                          <span>{!item.value.includes("#") && item.value}</span>
                        </label>
                      ))}
                    </div>
                  </form>
                ))}
              </div>
            </div>
            <div className="wrapper_cart_btn_count">
              <p tabIndex="0" onClick={() => this.props.increment(item.keyID)}>
                +
              </p>
              <span>{this.props.count[item.keyID]}</span>
              <p tabIndex="0" onClick={() => this.props.dicrement(item.keyID)}>
                &minus;
              </p>
            </div>
            <SwitcherGallery goods={item.goods} />
          </div>
        ))}
        <Total
          className="wrapper_cart_total"
          getCurrency={this.props.getCurrency}
          totalSumm={this.totalSumm()}
          btnCartOverlay={this.props.btnCartOverlay}
        />
      </>
    );
  }
}

const mapDispatchToProps = () => ({
  dicrement,
  increment,
});
const mapStateToProps = (state) => ({
  getGoods: state.cart.value,
  getCurrency: state.currency.value,
  count: state.cart.summ,
});
export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
