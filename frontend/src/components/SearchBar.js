import React, { Component } from "react";
import SearchIcon from "../assets/ic_Search.png";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    window.location.href = "/items?search=" + this.state.value;
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="flex">
          <input
            className="w-full h-9 rounded-l pl-5"
            placeholder="Nunca dejes de buscar"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit" className="h-9 px-3 bg-gray-button rounded-r">
            <img src={SearchIcon} alt="Buscar" height="36" />
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
