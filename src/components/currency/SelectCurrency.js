import React, { PureComponent } from "react";
import "./currency.css";
import client from "../../backend/index";
import { CURRENCY_DETIALS } from "../../backend/data";
import { connect } from "react-redux";
import { selectCurrency } from "../../reduxStore/currencySlice";

class SelectCurrency extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      classBlock: "display_none",
      arrow: "arrow",
      currency: [],
      value: "",
    };

    this.dropDown = this.dropDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    client
      .query({
        query: CURRENCY_DETIALS,
      })
      .then((result) => {
        if (result.loading) return null;
        if (result.error) return console.log(result.error);
        if (result.data.currencies === undefined) return null;
        else
          this.setState({
            currency: result.data.currencies,
            value: this.props.getCurrency,
          });
      });
  }

  dropDown() {
    this.state.classBlock === "select"
      ? this.setState({ classBlock: "display_none", arrow: "arrow" })
      : this.setState({ classBlock: "select", arrow: "arrow_down" });
  }

  handleBlur(event) {
    event.relatedTarget === null ||
    event.relatedTarget.className !== "active_chose"
      ? this.setState({ classBlock: "display_none", arrow: "arrow" })
      : this.setState({ value: event.relatedTarget.value });
    this.props.selectCurrency(this.state.value);
  }
  render() {
    return (
      <div
        tabIndex="0"
        className="drop_down"
        onKeyDown={(event) => event.code === "Enter" && this.dropDown()}
        onClick={this.dropDown}
        onBlur={this.handleBlur}
      >
        <span> {this.state.value}</span>
        <span className={this.state.arrow}></span>
        <div tabIndex="0" className={this.state.classBlock}>
          {this.state.currency.map((item, id) => (
            <option
              tabIndex="0"
              key={id}
              value={item.symbol}
              className="active_chose"
            >
              {item.symbol} {item.label}
            </option>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = () => ({
  selectCurrency,
});
const mapStateToProps = (state) => ({
  getCurrency: state.currency.value,
});

export default connect(mapStateToProps, mapDispatchToProps())(SelectCurrency);
