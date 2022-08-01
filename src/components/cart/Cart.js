import { Component } from "react";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.product = this.props.getGoods;
  }
  render() {
    return (
      <>
        <h1 className="wrapper_main_title">Cart</h1>
        {console.log(this.product)}
        <section>
          <h3>{this.product.length}</h3>
        </section>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  getGoods: state.cart.value,
});
export default connect(mapStateToProps)(Cart);
