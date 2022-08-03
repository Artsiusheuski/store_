import { Component } from "react";
import { connect } from "react-redux";
import "./cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.product = this.props.getGoods;
  }
  render() {
    return (
      <>
        <div className="wrapper_cart_overlay">
          <h1 className="title_cart_overlay">
            My Bag, <span>{this.product.length} items</span>
          </h1>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore optio
          officiis deserunt minus tempora fugiat ipsa ratione in molestias,
          accusantium aut necessitatibus odio aspernatur praesentium
          repellendus, corrupti corporis itaque laudantium?
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  getGoods: state.cart.value,
});
export default connect(mapStateToProps)(Cart);
