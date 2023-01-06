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
        style_filter: "wrapper_filter open_position_filter",
      });
    } else
      this.setState({
        style_filter: "wrapper_filter",
      });
  }

  render() {
    return (
      <section className={this.state.style_filter}>
        <div className="tooltip_filter" onClick={this.changeStyle}>
          <span className="tooltiptext_filter">
            {this.state.style_filter === "wrapper_filter"
              ? "Open filter"
              : "Closed filter"}
          </span>
        </div>
      </section>
    );
  }
}

export default FilterGoods;
