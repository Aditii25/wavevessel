import React, { useState } from "react";
import "./SingleProduct.css";
import contact_img from "../assets/contact_image.png";
import nft1 from "../assets/nft1.png";

import { Link, useLocation } from "react-router-dom";
import rightArrow from "../assets/right-arrow.svg";
import ShortExploreAllNfts from "../components/ShortExploreAllNfts";

function SingleProductPage() {
  const location = useLocation();
  console.log(location.state ? location.state.nft : null);
  const [nft, setNft] = useState(location.state ? location.state.nft : null);
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
                <img
                  src={nft[0].image_url ? nft[0].image_url : nft1}
                  alt={nft1}
                />
              </div>
              <div className="nft-details">
                <div className="token_standard">
                  <span>{nft[0].token_standard.toUpperCase()}</span>
                </div>
                <h2>
                  {nft[0].name
                    ? nft[0].name
                    : "the-amazing-game #" + nft[0].identifier}
                </h2>
                <div className="nft-owner">
                  <span>Owner</span>
                  <span className="address">{nft[0].nftOwner}</span>
                </div>
                <div className="nft-owner">
                  <span>Collection</span>
                  <span className="address">{nft[0].collection}</span>
                </div>
                <div className="nft-owner">
                  <span>Contract Address</span>
                  <span className="address">{nft[0].contract}</span>
                </div>
                <div className="nft-owner">
                  <span>On Sell For</span>
                  <h1 className="nft-cost-main">
                    {nft[0].price}
                    <span title="Base NFT cost" className="nft-cost-price">
                      Dai
                    </span>
                  </h1>
                  <Link
                    to={`/base/purchase/nft/base/${nft[0].identifier}/${nft[0].contract}`}
                    className="buy-nft-parent"
                    state={{
                      nft: nft,
                    }}
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
                  Dive into the enigmatic world of "Eyes Behind the Veil," where
                  concealed gazes hold untold stories. Each NFT captures a
                  unique perspective on the hidden mysteries of humanity. These
                  captivating visages beckon you to decipher the emotions and
                  intentions hidden behind the protective screens. As you
                  collect these NFTs, you become a curator of secrets,
                  unraveling the enigmas that lie within each face, one shielded
                  glance at a time.
                </span>
              </div>
              <div className="nft-owner">
                <span>Token ID</span>
                <span className="nft-description">{nft[0].identifier}</span>
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
