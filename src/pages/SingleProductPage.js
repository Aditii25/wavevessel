import React from "react";
import "./SingleProduct.css";
import contact_img from "../assets/contact_image.png";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";

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
                  <div className="buy-nft-parent">
                    <span className="buy-nft">Buy Now With Superfluid</span>
                  </div>
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
          <div class="products__footer">
            <a
              href="https://alethemes.com/onchain/shop/"
              rel="follow"
              target="_self"
              class="products__btn main-btn"
            >
              <div class="main-btn__name">
                <p>Explore all NFTs</p>
              </div>
              <div class="main-btn__icon">
                <img
                  decoding="async"
                  src="https://alethemes.com/onchain/wp-content/themes/onchain/assets/images/arrow-right.svg"
                  alt="category"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleProductPage;
