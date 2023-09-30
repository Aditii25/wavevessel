import React from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";
import rightArrow from "../assets/right-arrow.svg";

function ShortExploreAllNfts() {
  return (
    <div>
      <section className="second-section single-product-explore-nfts">
        <div className="container">
          <div>
            <div className="second-title">
              <p>COLLECTIONS</p>
            </div>
            <div className="second-main-title">
              <p>
                Explore <span>NFTs</span>
              </p>
            </div>
          </div>
          <div className="explore-nfts">
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft1 }}
              >
                <img src={nft1} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>
                <div className="listing-price-parent">
                  <span className="listing-price-title">Listing Price</span>
                  <span className="listing-price-value">0.003 ETH</span>
                </div>
                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft1 }}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft2 }}
              >
                <img src={nft2} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>
                <div className="listing-price-parent">
                  <span className="listing-price-title">Listing Price</span>
                  <span className="listing-price-value">0.003 ETH</span>
                </div>
                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft1 }}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft3 }}
              >
                <img src={nft3} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>
                <div className="listing-price-parent">
                  <span className="listing-price-title">Listing Price</span>
                  <span className="listing-price-value">0.003 ETH</span>
                </div>
                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft1 }}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="nft-item">
              <Link
                className="product_image"
                to="/shop/product"
                state={{ nft_image: nft4 }}
              >
                <img src={nft4} alt="" decoding="async" loading="lazy" />
              </Link>
              <div className="product-content">
                <p className="nft-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, necessitatibus?
                </p>
                <div className="listing-price-parent">
                  <span className="listing-price-title">Listing Price</span>
                  <span className="listing-price-value">0.003 ETH</span>
                </div>
                <div className="explore-buy">
                  <Link
                    className="explore-buy-button"
                    to="/shop/product"
                    state={{ nft_image: nft1 }}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShortExploreAllNfts;
