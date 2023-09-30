import React from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";

function ProfileAllNfts() {
  return (
    <div>
      <section className="container">
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
      </section>
    </div>
  );
}

export default ProfileAllNfts;
