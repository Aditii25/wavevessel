import React, { useState } from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";
import "./ProfileNfts.css";
import PopupForEditUnlist from "./PopupForEditUnlist";

function ProfileListedNfts() {
  const [showPopup, setShowPopup] = useState({
    show: false,
    tokenId: "",
    type: "",
    tokenAddress: "",
    price: "",
  });
  return (
    <div>
      <section className="container nft-bg">
        <div className="explore-nfts">
          <div className="nft-item">
            <div className="product_image">
              <img src={nft1} alt="" decoding="async" loading="lazy" />
            </div>
            <div className="product-content">
              <p className="nft-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                impedit.
              </p>
              <div className="listing-price-parent">
                <span className="listing-price-title">Listing Price</span>
                <span className="listing-price-value">0.003 ETH</span>
              </div>
              <div className="listing-buttons">
                <button
                  className="listing-edit-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "edit",
                      price: 0.001,
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="listing-cancle-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "unlist",
                      price: "",
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Unlist
                </button>
              </div>
            </div>
          </div>
          <div className="nft-item">
            <div className="product_image">
              <img src={nft2} alt="" decoding="async" loading="lazy" />
            </div>
            <div className="product-content">
              <p className="nft-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                impedit.
              </p>
              <div className="listing-price-parent">
                <span className="listing-price-title">Listing Price</span>
                <span className="listing-price-value">0.003 ETH</span>
              </div>
              <div className="listing-buttons">
                <button
                  className="listing-edit-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "edit",
                      price: 0.001,
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="listing-cancle-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "unlist",
                      price: "",
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Unlist
                </button>
              </div>
            </div>
          </div>
          <div className="nft-item">
            <div className="product_image">
              <img src={nft3} alt="" decoding="async" loading="lazy" />
            </div>
            <div className="product-content">
              <p className="nft-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                impedit.
              </p>
              <div className="listing-price-parent">
                <span className="listing-price-title">Listing Price</span>
                <span className="listing-price-value">0.003 ETH</span>
              </div>
              <div className="listing-buttons">
                <button
                  className="listing-edit-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "edit",
                      price: 0.001,
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="listing-cancle-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "unlist",
                      price: "",
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Unlist
                </button>
              </div>
            </div>
          </div>
          <div className="nft-item">
            <div className="product_image">
              <img src={nft4} alt="" decoding="async" loading="lazy" />
            </div>
            <div className="product-content">
              <p className="nft-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                impedit.
              </p>
              <div className="listing-price-parent">
                <span className="listing-price-title">Listing Price</span>
                <span className="listing-price-value">0.003 ETH</span>
              </div>
              <div className="listing-buttons">
                <button
                  className="listing-edit-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "edit",
                      price: 0.001,
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="listing-cancle-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "unlist",
                      price: "",
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Unlist
                </button>
              </div>
            </div>
          </div>
          <div className="nft-item">
            <div className="product_image">
              <img src={nft2} alt="" decoding="async" loading="lazy" />
            </div>
            <div className="product-content">
              <p className="nft-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                impedit.
              </p>
              <div className="listing-price-parent">
                <span className="listing-price-title">Listing Price</span>
                <span className="listing-price-value">0.003 ETH</span>
              </div>
              <div className="listing-buttons">
                <button
                  className="listing-edit-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "edit",
                      price: 0.001,
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="listing-cancle-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "unlist",
                      price: "",
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Unlist
                </button>
              </div>
            </div>
          </div>
          <div className="nft-item">
            <div className="product_image">
              <img src={nft1} alt="" decoding="async" loading="lazy" />
            </div>
            <div className="product-content">
              <p className="nft-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                impedit.
              </p>
              <div className="listing-price-parent">
                <span className="listing-price-title">Listing Price</span>
                <span className="listing-price-value">0.003 ETH</span>
              </div>
              <div className="listing-buttons">
                <button
                  className="listing-edit-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "edit",
                      price: 0.001,
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="listing-cancle-button"
                  onClick={() => {
                    setShowPopup({
                      show: true,
                      type: "unlist",
                      price: "",
                      tokenAddress: "0x29njjs",
                      tokenId: "1234",
                    });
                  }}
                >
                  Unlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showPopup.show ? (
        <PopupForEditUnlist setShowPopup={setShowPopup} showPopup={showPopup} />
      ) : null}
    </div>
  );
}

export default ProfileListedNfts;
