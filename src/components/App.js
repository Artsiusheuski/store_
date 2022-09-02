import React, { PureComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import PLP from "./categories/PLP";
import Cart from "./cart/Cart";
import PDP from "./categories/discriptionsGoods/PDP";
import Error from "./Error";
import { CATEGORY_NAMES } from "./data/data";
import client from "./data";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      namesCategory: [],
      categoryPath: "",
    };
  }

  getPathName = (arg) => {
    this.setState({
      categoryPath: arg,
    });
  };

  componentDidMount() {
    client
      .query({
        query: CATEGORY_NAMES,
      })
      .then((result) => {
        if (result.loading) return null;
        if (result.error) return console.log(result.error);
        if (result.data.categories === undefined) return null;
        else
          return this.setState({
            namesCategory: result.data.categories.map((item) => item.name),
          });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <Router>
          <Header
            namesCategory={this.state.namesCategory}
            getPathName={this.getPathName}
          ></Header>
          <main className="wrapper_main">
            <Routes>
              <Route path="/" element={<PLP />} />
              <Route
                path="/:path"
                element={<PLP path={this.state.categoryPath} />}
              />
              <Route exact path=":path/:ID" element={<PDP />} />
              <Route path="*" element={<Error />} />
              <Route exact path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
