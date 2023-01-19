import React, { PureComponent } from "react";

class FilterGoods extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      style_filter: "wrapper_filter",
      productsURL: "",
    };

    this.changeStyle = this.changeStyle.bind(this);
    this.newIndexArrow = this.newIndexArrow.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.attributes.length !== this.props.attributes.length)
      this.setState({
        productsURL: {},
      });
  }

  changeStyle() {
    if (this.state.style_filter === "wrapper_filter") {
      this.setState({
        style_filter: "wrapper_filter open_position_filter",
      });
    } else {
      this.setState({
        style_filter: "wrapper_filter",
        value: "",
      });
    }
  }

  newIndexArrow = () => {
    let newArr = [];
    this.props.attributes.map((i) => i.map((item) => newArr.push(item)));

    let finalAtr = newArr.map((i) => {
      return {
        nameAttributes: i.name,
        attributes: i.items.map((i) => i.value),
      };
    });

    let box = {};
    for (let i = 0; i < finalAtr.length; i++) {
      let summ = [];
      for (let s = 0; s < finalAtr.length; s++) {
        if (finalAtr[i].nameAttributes === finalAtr[s].nameAttributes) {
          summ.push(...finalAtr[s].attributes, ...finalAtr[i].attributes);
          box[finalAtr[i].nameAttributes] = [...new Set(summ)];
        }
      }
    }
    return Object.entries(box);
  };

  hundlerValueURL = (event, key) => {
    if (event) {
      this.setState({
        productsURL: event.target.value,
      });
    } else
      this.setState({
        productsURL: "",
      });

    const url = new URL(window.location);
    if (event && key) {
      url.searchParams.set(key, event.target.value);
      window.history.replaceState({}, "", url);
    } else {
      url.searchParams.set(key, "");
      window.history.replaceState({}, "", url);
    }
    this.props.getParamsGoodsURL();
  };

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
        <div
          className="main_filter_conteiner"
          style={{
            visibility:
              this.state.style_filter === "wrapper_filter open_position_filter"
                ? "visible"
                : "hidden",
          }}>
          <h3>Filtres</h3>
          <div className="filter_attributes_list">
            {this.newIndexArrow().map((item) => (
              <div key={item}>
                <h5>{item[0]}</h5>

                {item[0] === "Color" &&
                  item[1].map((value) => (
                    <label
                      className="labael_filter_color"
                      tabIndex="0"
                      key={value}>
                      <input
                        onInput={(event) =>
                          event.target.checked
                            ? this.hundlerValueURL(event, item[0])
                            : this.hundlerValueURL(undefined, item[0])
                        }
                        name={item[0]}
                        type="checkbox"
                        value={value}
                        className="goods_descriptions_check_color"
                        style={{
                          backgroundColor: value,
                        }}
                      />
                    </label>
                  ))}
                {(item[0] === "Size" || item[0] === "Capacity") && (
                  <label key={item[0]}>
                    <select
                      name={item[0]}
                      onChange={(event) =>
                        this.hundlerValueURL(event, item[0])
                      }>
                      {item[1].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                {item[0] !== "Size" &&
                  item[0] !== "Color" &&
                  item[0] !== "Capacity" &&
                  item[1].map((value) => (
                    <div key={value}>
                      <label>
                        <input
                          onInput={(event) =>
                            event.target.checked
                              ? this.hundlerValueURL(event, item[0])
                              : this.hundlerValueURL(undefined, item[0])
                          }
                          className="filter_chechbox"
                          type="checkbox"
                          name={item[0]}
                          value={value}
                        />
                        {value}
                      </label>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default FilterGoods;
