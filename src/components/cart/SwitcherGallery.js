import React, { PureComponent } from "react";

export default class SwitcherGallery extends PureComponent {
  constructor() {
    super();
    this.count = 0;
    this.state = {
      counter: 0,
    };
  }

  switcherImgCartNext = (arr) => {
    if (this.state.counter === arr.length - 1) {
      this.count = -1;
    }
    this.setState({
      counter: ++this.count,
    });
  };
  switcherImgCartPrev = (arr) => {
    if (0 === this.state.counter) {
      this.count = arr.length;
    }
    this.setState({
      counter: --this.count,
    });
  };

  render() {
    return (
      <div className="wrapper_cart_goods_img">
        <div
          className={
            this.props.goods.gallery.length > 1
              ? "switcher_img_cart"
              : "display_none"
          }
        >
          <p onClick={() => this.switcherImgCartPrev(this.props.goods.gallery)}>
            <i className="arrow_left"></i>
          </p>

          <p onClick={() => this.switcherImgCartNext(this.props.goods.gallery)}>
            <i className="arrow_rigth"></i>
          </p>
        </div>
        <img
          src={this.props.goods.gallery[this.state.counter]}
          alt="CartGoodsImg"
        />
      </div>
    );
  }
}
