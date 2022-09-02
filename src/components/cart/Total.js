import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Total extends PureComponent {
  constructor(props) {
    super(props);
    this.hundlePushGoods = this.hundlePushGoods.bind(this);
  }

  taxValue = () => {
    let a = this.props.totalSumm / 100;
    let value = a * 21; //for example

    return value.toFixed(2);
  };

  // for backend
  hundlePushGoods(orderGoods, summ, countGoods) {
    orderGoods = JSON.parse(localStorage.getItem("cartValue"));
    summ = localStorage.getItem("carrency") + this.props.totalSumm;
    countGoods = this.props.count;
    // console.log(orderGoods, summ, countGoods);
  }

  render() {
    return (
      <>
        <div className="cart_wrapper_down_total">
          <div>
            <p>Tax 21%:</p>
            <span>
              {this.props.getCurrency}
              {this.taxValue()}
            </span>
          </div>
          <div>
            <p>Quantity:</p>
            <span>{this.props.quantity}</span>
          </div>
        </div>
        <div className="wrapper_cart_total">
          <h3>Total:</h3>
          <span>
            {this.props.getCurrency}
            {this.props.totalSumm}
          </span>
        </div>
        <div className="wrapper_cart_btnDown">
          <span
            onClick={this.props.btnCartOverlay}
            className="wrapper_cart_btn_two"
          >
            <Link className="wrapper_cart_view_bag" to="/cart">
              VIEW BAG
            </Link>
          </span>
          <input
            onClick={this.hundlePushGoods}
            type="button"
            className="wrapper_cart_btn_two wrapper_cart_check_out"
            defaultValue="CHECK OUT"
          />
        </div>
        <button
          onClick={this.hundlePushGoods}
          className="goods_descriptions_btn"
        >
          ORDER
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cart.summ,
  quantity:
    Object.values(state.cart.summ).length > 0 &&
    Object.values(state.cart.summ).reduce((a, b) => a + b),
});
export default connect(mapStateToProps)(Total);
