import React, { PureComponent } from "react";

class FilterGoods extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      style_filter: "wrapper_filter",
    };

    this.changeStyle = this.changeStyle.bind(this);
  }

  changeStyle(event) {
    event.preventDefault();
    // let wrapperMain = document.querySelector(".wrapper_main");

    if (this.state.style_filter === "wrapper_filter") {
      this.setState({
        style_filter: "wrapper_filter open_position_filter",
      });
      // wrapperMain.style.gridTemplateColumns = "15% 1fr 5%";
    } else {
      this.setState({
        style_filter: "wrapper_filter",
      });
      // wrapperMain.style.gridTemplateColumns = "5% 1fr 5%";
    }
  }

  render() {
    return (
      <section className={this.state.style_filter}>
        <div className="wrapper_tooltip_filter">
          <div className="tooltip_filter" onClick={this.changeStyle}>
            <span className="tooltiptext_filter">
              {this.state.style_filter === "wrapper_filter"
                ? "Open filters"
                : "Closed filters"}
            </span>
          </div>
        </div>
        {console.log(new Set(this.props.attributes))}
        <div
          className="main_filter_conteiner"
          style={{
            visibility:
              this.state.style_filter === "wrapper_filter open_position_filter"
                ? "visible"
                : "hidden",
          }}>
          <h3>Filtres</h3>
          <form className="filter_attributes_list">
            {this.props.attributes.map((item, id) => (
              <div key={id}>
                {item.map((i, id) => (
                  <div key={id}>
                    <h5>{i.name}</h5>

                    {i.name === "Color" &&
                      i.items.map((i) => (
                        <label
                          className="labael_filter_color"
                          tabIndex="0"
                          htmlFor={i.id}
                          key={i.id}>
                          <input
                            key={i.id}
                            type="checkbox"
                            id={this.id}
                            defaultValue={i.value}
                            className="goods_descriptions_check_color"
                            style={{
                              backgroundColor: i.value,
                            }}
                          />
                        </label>
                      ))}
                    {(i.name === "Size" || i.name === "Capacity") && (
                      <label key={i.id} htmlFor={i.id}>
                        <select name={i.id}>
                          {i.items.map((i) => (
                            <option key={i.id} value={i.value}>
                              {i.value}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                    {i.name !== "Size" &&
                      i.name !== "Color" &&
                      i.name !== "Capacity" &&
                      i.items.map((i) => (
                        <div key={i.id}>
                          <input
                            className="filter_chechbox"
                            type="checkbox"
                            name={i.id}
                            value={i.value}
                            id={i.id}
                          />
                          <label htmlFor={i.id}>{i.value}</label>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </form>
        </div>
      </section>
    );
  }
}

export default FilterGoods;
