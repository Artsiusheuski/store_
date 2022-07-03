import { React, Component } from "react";

export default class DiscriptionsGoods extends Component {
  render() {
    return (
      <section className="wrapper_goods_descriptions">
        <p>{this.props.id}</p>
      </section>
    );
  }
}
