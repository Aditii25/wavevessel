import React, { useState } from "react";
import "./SingleProduct.css";
import contact_img from "../assets/contact_image.png";
import nft1 from "../assets/nft1.png";

import { Link } from "react-router-dom";
import rightArrow from "../assets/right-arrow.svg";
import ShortExploreAllNfts from "../components/ShortExploreAllNfts";

function SingleProductPage() {
  return (
    <div>
      <div className="single_product">
        <div className="first_heading">
          <section className="container">
            <div className="first_wrapper">
              <div className="first_content">
                <div className="first_title">
                  <p>Shop </p>
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
              <img src={contact_img} alt="contact" />
              <div className="first_object circle"></div>
            </div>

            <div className="nft-card">
              <div className="nft-image">
                <img src={nft1} alt={nft1} />
              </div>
              <div className="nft-details">
                <div className="token_standard">
                  <span>ERC721</span>
                </div>
                <h2>Testing something</h2>
                <div className="nft-owner">
                  <span>Owner</span>
                  <span className="address">0x5412fEF...cA865</span>
                </div>
                <div className="nft-owner">
                  <span>Collection</span>
                  <span className="address">0the-masterpiece-collection-4</span>
                </div>
                <div className="nft-owner">
                  <span>Contract Address</span>
                  <span className="address">0x54EF...cA865</span>
                </div>
                <div className="nft-owner">
                  <span>On Sale For</span>
                  <h1 className="nft-cost-main">
                    0.001
                    <span title="Base NFT cost" className="nft-cost-price">
                      ETH
                    </span>
                  </h1>
                  <Link
                    to={`/base/purchase/nft/base/5/0x32cff5c2a7233097efe3e8dc708d1df141780d69`}
                    className="buy-nft-parent"
                  >
                    <span className="buy-nft">Buy Now With Superfluid</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="nft-description-parent">
              <div className="nft-owner">
                <span>Description</span>
                <span className="nft-description">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Fugit pariatur perspiciatis omnis? Dolore magnam voluptates
                  quibusdam neque quo! Obcaecati, iusto assumenda. A, laboriosam
                  eaque natus cupiditate est provident cum voluptas eligendi ut
                  architecto voluptate? Amet, autem ducimus accusantium
                  praesentium suscipit, molestias, mollitia vel laborum sequi
                  optio aliquam eos. Rem, qui. Fuga vel labore illo? Praesentium
                  explicabo ratione sint dolore neque architecto distinctio
                  alias, quae ab culpa facere asperiores adipisci temporibus quo
                  laboriosam. Incidunt, doloribus architecto sapiente hic nemo
                  velit labore aliquid. Minima aut impedit quisquam expedita
                  repellendus numquam quam quidem delectus eligendi, obcaecati
                  repudiandae a, temporibus assumenda saepe excepturi. Commodi.
                </span>
              </div>
              <div className="nft-owner">
                <span>Token ID</span>
                <span className="nft-description">17653324</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ShortExploreAllNfts />
    </div>
  );
}

export default SingleProductPage;
