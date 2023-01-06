import React, { PureComponent } from "react";

class FilterGoods extends PureComponent {
  constructor() {
    super();
    this.state = {
      style_filter: "wrapper_filter",
    };

    this.changeStyle = this.changeStyle.bind(this);
  }

  changeStyle(event) {
    event.preventDefault();
    if (this.state.style_filter === "wrapper_filter") {
      this.setState({
        style_filter: "wrapper_filter open_position",
      });
    } else
      this.setState({
        style_filter: "wrapper_filter",
      });
  }

  render() {
    return (
      <section className={this.state.style_filter}>
        <span onClick={this.changeStyle}></span>
      </section>
    );
  }
}

export default FilterGoods;
