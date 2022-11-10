// import Style from "./App.css";
import React, { Component } from "react";
import "../components/Main.css";
import logo from "../Images/add.svg";
import axios from "axios";

class Main extends Component {
  render() {
    return (
      <div className="addp-content">
        <div className="addp-container">
          <div>
            <h1 className="page-head"> Add Product </h1>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const REACT_APP_PINATA_API_KEY = "590eced683c338e2a668";
                const REACT_APP_PINATA_API_SECRET =
                  "57baf9c20839e80b6e313768cd938f9a5ee7d40ac215491676a74e37bab1ede0";
                const fileImg = this.productImg.files[0];
                if (fileImg) {
                  try {
                    const formData = new FormData();
                    formData.append("file", fileImg);

                    const resFile = await axios({
                      method: "post",
                      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                      data: formData,
                      headers: {
                        pinata_api_key: `${REACT_APP_PINATA_API_KEY}`,
                        pinata_secret_api_key: `${REACT_APP_PINATA_API_SECRET}`,
                        "Content-Type": "multipart/form-data",
                      },
                    });

                    const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
                    console.log(ImgHash);
                    const img = ImgHash;
                    const name = this.productName.value;
                    const desc = this.productDesc.value;
                    const Web3Utils = require("web3-utils");
                    const price = Web3Utils.toWei(
                      this.productPrice.value.toString(),
                      "Ether"
                    );
                    console.log(desc);
                    console.log(img);
                    this.props.createproduct(name, price, desc, img);
                    //Take a look at your Pinata Pinned section, you will see a new file added to you list.
                  } catch (error) {
                    console.log("Error sending File to IPFS: ");
                    console.log(error);
                  }
                }
              }}
            >
              <div className="prod-name-div">
                <label>Product Name</label>
                <input
                  id="productName"
                  type="text"
                  ref={(input) => {
                    this.productName = input;
                  }}
                  className="form-control"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div className="prod-price-div">
                <label>Product Price</label>
                <input
                  id="productPrice"
                  type="text"
                  ref={(input) => {
                    this.productPrice = input;
                  }}
                  className="form-control"
                  placeholder="Product Price"
                  required
                />
              </div>

              <div className="product-desc">
                <label>About the Product</label>
                <textarea
                  type="text"
                  ref={(input) => {
                    this.productDesc = input;
                  }}
                  className="form-control"
                  placeholder="Explain about the product"
                  required
                />
              </div>

              <div className="product-desc">
                <label>Upload Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  ref={(input) => {
                    this.productImg = input;
                  }}
                  placeholder="Explain about the product"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="form-button add-product-button"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="vector-image">
          <img src={logo} style={{ height: "60vh" }} alt="price-img" />
        </div>
      </div>
    );
  }
}

export default Main;
