import React, { Component } from "react";
import { Link } from "react-router-dom";
import { parse } from "query-string";
import axios from "axios";
import ShippingIcon from "../assets/ic_shipping.png";
import Navbar from "./Navbar";
import "../styles/App.scss";

class Results extends Component {
  apiURL = "http://localhost:8080";
  queryParams = parse(window.location.search);

  constructor(props) {
    super(props);
    this.state = { list: [] };

    axios
      .get(`${this.apiURL}/api/items?q=${this.queryParams.search}`)
      .then((response) => {
        console.log('==>', response.data)
        this.setState({ list: response.data?.items });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const items = this.state.list.map((item, i) => (
      <div key={item.id}>
        {/* ITEM */}
        <Link to={`/items/${item.id}`}>
          <div className="item mb-5 mt-5 grid grid-cols-12 gap-4 cursor-pointer">
            <div className="col-start-1 col-end-4">
              <div
                className="h-52 bg-no-repeat bg-auto bg-center"
                style={{
                  backgroundImage:
                    "url(" +
                    (item.picture || "https://i.stack.imgur.com/6M513.png") +
                    ")",
                }}
              ></div>
            </div>
            <div className="p-5 col-start-4 col-end-13">
              <div className="grid grid-cols-12">
                <div className="col-start-1 col-end-7">
                  <h1 className="mb-2 flex">
                    $ {item.price?.amount},{item.price?.decimals}
                    <span className="pl-2">
                      <img src={ShippingIcon} alt="Envío" />
                    </span>
                  </h1>
                  <h2>{item.title}</h2>
                </div>
                <div className="col-start-10 col-end-13">
                  <h4>Mendoza</h4>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {(() => {
            if (i < this.state.list.length - 1) {
                return <hr />
            }
        })()}
      </div>
    ));

    return (
      <div>
        <Navbar onListItems={this.handleItems} />
        <div className="my-4 mx-14 grid grid-cols-12 gap-4">
          <div className="col-start-2 col-end-12">
            <div className="mb-20 px-4 pt-1 pb-5 content bg-white rounded">
              {items}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
