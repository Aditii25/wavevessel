import React, { useState } from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import nft5 from "../assets/nft5.png";
import nft6 from "../assets/nft6.png";
import nft7 from "../assets/nft7.png";
import nft8 from "../assets/nft8.png";
import nft9 from "../assets/nft9.jpg";
import nft10 from "../assets/nft10.jpg";
import { Link } from "react-router-dom";
import PopupForSellNFT from "./PopupForSellNFT";

function ProfileAllNfts() {
  const [showPopup, setShowPopup] = useState({
    show: false,
    tokenId: "",
    tokenAddress: "",
  });

  return (
    <div>
      <section className="second-section single-product-explore-nfts">
        <div className="container">
          <div className="explore-nfts">
            <div className="nft-item">
              <div className="product_image">
                <img src={nft1} alt="" decoding="async" loading="lazy" />
              </div>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>
                <div className="explore-buy">
                  <div
                    className="explore-buy-button"
                    onClick={() => {
                      setShowPopup({
                        show: true,
                        tokenId: 2,
                        tokenAddress:
                          "0x2769090f83aD8B496B64dAEa8eE4572DF52972B5",
                      });
                    }}
                  >
                    List Now
                  </div>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <div className="product_image">
                <img src={nft2} alt="" decoding="async" loading="lazy" />
              </div>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>

                <div className="explore-buy">
                  <div
                    className="explore-buy-button"
                    onClick={() => {
                      setShowPopup({
                        show: true,
                        tokenId: 0,
                        tokenAddress:
                          "0x2980947b64B38B51ED0F878C29a55c319C5dA277",
                      });
                    }}
                  >
                    List Now
                  </div>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <div className="product_image">
                <img src={nft3} alt="" decoding="async" loading="lazy" />
              </div>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>

                <div className="explore-buy">
                  <div
                    className="explore-buy-button"
                    onClick={() => {
                      setShowPopup({
                        show: true,
                        tokenId: 0,
                        tokenAddress:
                          "0xD02ae5223be2c604a0d67a6434685f20FAc9CFa6",
                      });
                    }}
                  >
                    List Now
                  </div>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <div className="product_image">
                <img src={nft4} alt="" decoding="async" loading="lazy" />
              </div>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>
                <div className="explore-buy">
                  <div
                    className="explore-buy-button"
                    onClick={() => {
                      setShowPopup({
                        show: true,
                        tokenId: 2,
                        tokenAddress:
                          "0xD02ae5223be2c604a0d67a6434685f20FAc9CFa6",
                      });
                    }}
                  >
                    List Now
                  </div>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft5 }}
              >
                <img src={nft5} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>

                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft5 }}
                  >
                    List Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft6 }}
              >
                <img src={nft6} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>

                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft6 }}
                  >
                    List Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft7 }}
              >
                <img src={nft7} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>

                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft7 }}
                  >
                    List Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft8 }}
              >
                <img src={nft8} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>

                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft8 }}
                  >
                    List Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft9 }}
              >
                <img src={nft9} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>

                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft9 }}
                  >
                    List Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft10 }}
              >
                <img src={nft10} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>

                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft10 }}
                  >
                    List Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showPopup.show ? (
        <PopupForSellNFT showPopup={showPopup} setShowPopup={setShowPopup} />
      ) : null}
    </div>
  );
}

export default ProfileAllNfts;
