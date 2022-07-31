import { Component } from "react";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.atributes = this.props.getGoods;
  }

  render() {
    return (
      <>
        {console.log(this.atributes)}
        <h1 className="wrapper_main_title">Cart</h1>
        <section>
          {this.atributes.map((item, index) => (
            <div key={index}>
              {item.goods.discriptionGoods.name}
              {item.goods.discriptionGoods.brand}

              <p>{this.atributes.length}</p>
            </div>
          ))}
        </section>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  getGoods: state.cart.value,
});
export default connect(mapStateToProps)(Cart);
