import React, { Component } from "react";
import logo from "../assets/Logo_ML.png";
import SearchBar from "./SearchBar";

class Navbar extends Component {
  handleItems = (list) => {
    this.props.onListItems(list);
  };

  render() {
    return (
      <div className="bg-yellow-logo">
        <div className="mx-14 grid grid-cols-12 gap-4">
          <div className="col-start-2 col-end-12">
            <div className="py-2 grid grid-cols-12">
              <div>
                <img src={logo} alt="Logo" height="36" />
              </div>
              <div className="col-start-2 col-end-13">
                <SearchBar onListItems={this.handleItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
