import React from "react";
import rocket from "../assets/rocket.png";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";

function AllNFTExplore() {
  return (
    <div>
      <div className="single_product">
        <div className="first_heading">
          <section className="container">
            <div className="first_wrapper">
              <div className="first_content">
                <div className="first_title">
                  <p>Explore </p>
                </div>
                <div className="first_subtitle">
                  <p>
                    Explore a World of Digital Possibilities, Where You Can
                    Discover, Collect, and Own Unique Digital Treasures
                  </p>
                </div>
              </div>
            </div>
            <div className="first_image">
              <img src={rocket} alt="contact" />
              <div className="first_object circle"></div>
            </div>
          </section>
        </div>
      </div>
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
                <p>Hello</p>
                <p>Hello</p>
              </div>
            </div>
            <div className="nft-item">
              <div className="product_image">
                <img src={nft2} alt="" decoding="async" loading="lazy" />
              </div>
              <div className="product-content">
                <p>Hello</p>
                <p>Hello</p>
              </div>
            </div>
            <div className="nft-item">
              <div className="product_image">
                <img src={nft3} alt="" decoding="async" loading="lazy" />
              </div>
              <div className="product-content">
                <p>Hello</p>
                <p>Hello</p>
              </div>
            </div>
            <div className="nft-item">
              <div className="product_image">
                <img src={nft4} alt="" decoding="async" loading="lazy" />
              </div>
              <div className="product-content">
                <p>Hello</p>
                <p>Hello</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllNFTExplore;
