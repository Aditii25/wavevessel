import React from "react";
import "./Home.css";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import feature01 from "../assets/feature01.png";
import feature02 from "../assets/feature02.png";
import feature03 from "../assets/feature03.png";
import feature04 from "../assets/feature04.png";
import feature05 from "../assets/feature05.png";
import feature06 from "../assets/feature06.png";
import feature07 from "../assets/feature07.png";
import feature08 from "../assets/feature08.png";

import base from "../assets/base.svg";
import opensea from "../assets/opensea.png";
import superfluid from "../assets/superfluid.svg";
import rightArrow from "../assets/right-arrow.svg";
import bg1 from "../assets/header-bg-1.png";
import { Link } from "react-router-dom";
import ShortExploreAllNfts from "../components/ShortExploreAllNfts";

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero__object circle"></div>
          <div className="hero__wrapper">
            <div className="hero__content">
              <div className="hero__title animated">
                <h1 id="title" title="">
                  <span title="Solana NFT" className="stroke-double">
                    Base NFT
                  </span>
                  Collectibles
                </h1>
              </div>
              <div className="hero__subtitle animated">
                <p>
                  Navigating the Seas of Digital Artistry: Explore, Collect, and
                  Create with WaveVessel's Unique NFT Universe.
                </p>
              </div>
              <div className="hero__buttons animated">
                <div className="cta-button">
                  <Link to="/explore/base/all" rel="noreferrer">
                    Explore Collections
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__image">
          <img decoding="async" src={bg1} alt="Base NFT" />
        </div>
      </section>
      <ShortExploreAllNfts />
      <section className="powered-by">
        <div className="powered-by-main-title">
          <p>
            Powered <span>By</span>
          </p>
        </div>
        <section class="partener">
          <div class="container">
            <div class="partener__wrapper">
              <div class="partener__list">
                <div class="partener__logo">
                  <a href="https://base.org/" rel="noreferrer" target="_blank">
                    <img src={base} alt="" />
                  </a>
                </div>
                <div class="partener__logo">
                  <a
                    href="http://1.envato.market/GjgYWk"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img decoding="async" src={superfluid} alt="partner" />
                  </a>
                </div>
                <div class="partener__logo">
                  <a
                    href="http://1.envato.market/GjgYWk"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img decoding="async" src={opensea} alt="partner" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="reasons">
        <div className="second-title">
          <p>FEATURES</p>
        </div>
        <div className="powered-by-main-title">
          <p>
            Some reasons to <span>Choose Us</span>
          </p>
        </div>
        <p className="description">
          Our team's deep experience, cutting-edge technology, and unwavering
          commitment to security pros.
        </p>
        <section className="container">
          <div className="features_list">
            <div className="features_item">
              <div className="features_icon">
                <img src={feature01} alt="Base Blockchain" />
              </div>
              <div className="features_title">
                <p>Base Blockchain Integration</p>
              </div>
              <div className="features_description">
                Powered by Base Blockchain: We proudly utilize the Base network,
                a blockchain solution known for its low-cost transactions,
                improving accessibility, and boosting scalability, resulting in
                a smoother NFT marketplace experience.
              </div>
            </div>
            <div className="features_item">
              <div className="features_icon">
                <img src={feature02} alt="Base Blockchain" />
              </div>
              <div className="features_title">
                <p>Cutting-Edge Technology</p>
              </div>
              <div className="features_description">
                WaveVessel's Innovation: Leveraging the forefront of technology,
                including the power of Base blockchain, we offer pioneering
                solutions in the crypto and NFT realms, backed by our dedicated
                team.
              </div>
            </div>
            <div className="features_item">
              <div className="features_icon">
                <img src={feature03} alt="Base Blockchain" />
              </div>
              <div className="features_title">
                <p>Absolute Transparency</p>
              </div>
              <div className="features_description">
                Transparent at Every Wave: We uphold an unwavering commitment to
                transparency, providing regular updates, progress reports, and
                complete visibility into your transactions, all made more
                efficient by Base blockchain.
              </div>
            </div>
            <div className="features_item">
              <div className="features_icon">
                <img src={feature04} alt="Base Blockchain" />
              </div>
              <div className="features_title">
                <p>Superfluid Payment</p>
              </div>
              <div className="features_description">
                Ride the Superfluid Wave: Experience lightning-fast and seamless
                transactions with our innovative "Superfluid Payment" feature,
                which is enhanced by the low-cost capabilities of Base
                blockchain.
              </div>
            </div>
            <div className="features_item">
              <div className="features_icon">
                <img src={feature05} alt="Base Blockchain" />
              </div>
              <div className="features_title">
                <p>Creative NFT Solutions</p>
              </div>
              <div className="features_description">
                Unleash Your Imagination: Explore our wide array of creative NFT
                solutions, from artist showcases to rare collectibles, unlocking
                new possibilities in the digital world while harnessing the
                capabilities of Base blockchain.
              </div>
            </div>
            <div className="features_item">
              <div className="features_icon">
                <img src={feature06} alt="Base Blockchain" />
              </div>
              <div className="features_title">
                <p>Customer Satisfaction</p>
              </div>
              <div className="features_description">
                Your Satisfaction, Our Mission: We are dedicated to ensuring
                each client's complete satisfaction, working tirelessly to
                exceed your expectations, thanks to the secure and efficient
                environment provided by Base blockchain.
              </div>
            </div>
            <div className="features_item">
              <div className="features_icon">
                <img src={feature07} alt="Base Blockchain" />
              </div>
              <div className="features_title">
                <p>Security and Privacy</p>
              </div>
              <div className="features_description">
                Your Assets, Our Fortress: We prioritize the security and
                privacy of your assets, employing industry-leading protocols to
                safeguard your data and investments, with the added peace of
                mind from Base blockchain's features.
              </div>
            </div>
            <div className="features_item">
              <div className="features_icon">
                <img src={feature08} alt="Base Blockchain" />
              </div>
              <div className="features_title">
                <p>Competitive Pricing</p>
              </div>
              <div className="features_description">
                Value Beyond Compare: WaveVessel offers competitive pricing,
                ensuring our clients receive exceptional value for their
                investment. Base blockchain's low-cost transactions complement
                our affordability.
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;
