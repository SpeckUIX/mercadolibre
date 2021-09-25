import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/App.scss";

function ProductDetail() {
  const apiURL = "http://localhost:8080";
  const { id } = useParams();
  const [item, setItem] = useState({});

  axios
    .get(`${apiURL}/api/items/${id}`)
    .then((response) => {
      console.log(response.data)
      setItem(response.data?.item);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div>
      <Navbar />
      <div className="mx-14 grid grid-cols-12 gap-4">
        <div className="col-start-2 col-end-12">
          <div className="pt-4 breadcrumb breadcrumb">
            <a href="/" className="text-gray-400">
              Electronica, audio, video
              <span className="material-icons separator">
                arrow_forward_ios
              </span>
            </a>
            <a href="/" className="text-gray-400">
              iPod
              <span className="material-icons separator">
                arrow_forward_ios
              </span>
            </a>
            <a href="/" className="text-gray-400">
              Reproductores
              <span className="material-icons separator">
                arrow_forward_ios
              </span>
            </a>
            <a href="/" className="text-gray-400">
              32 GB
              <span className="material-icons separator">
                arrow_forward_ios
              </span>
            </a>
          </div>
          <div className="mt-4 mb-20 px-4 pt-1 pb-5 content bg-white rounded">
            <div className="p-6">
              <div className="grid grid-cols-12 gap-10">
                <div
                  className="h-96 w-full bg-gray-200 col-start-1 col-end-9 bg-no-repeat bg-contain bg-center"
                  style={{
                    backgroundImage:
                      "url(" +
                      (item.picture ||
                        "https://i.stack.imgur.com/6M513.png") +
                      ")",
                  }}
                ></div>
                <div className="col-start-9 col-end-13">
                  <h5>{item.subtitle}</h5>
                  <h1 className="font-bold">{item.title}</h1>
                  <h1 className="mt-5 mb-10 amount">
                    $ {item.price?.amount}{" "}
                    <span>{item.price?.decimals || "00"}</span>
                  </h1>
                  <button className="w-full bg-blue-500 text-white text-ls rounded py-2.5">
                    Comprar
                  </button>
                </div>
              </div>
              <div className="mt-24 description">
                <h1 className="title">Descripción del producto</h1>
                <p className="my-6">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
