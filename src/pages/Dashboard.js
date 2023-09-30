import React, { useState } from "react";
import diamond from "../assets/diamond.png";
import "./Dashboard.css";
import ProfileAllNfts from "../components/ProfileAllNfts";
import ProfileListedNfts from "../components/ProfileListedNfts";
import ProfileOnSaleNfts from "../components/ProfileOnSaleNfts";
import ProfilePurchasedNfts from "../components/ProfilePurchasedNfts";

function Dashboard() {
  const [navbar, setNavbar] = useState("all");

  const handleNavclick = (nav) => {
    setNavbar(nav);
  };
  return (
    <div>
      <div className="single_product">
        <div className="first_heading">
          <section className="container">
            <div className="first_wrapper">
              <div className="first_content">
                <div className="first_title">
                  <p>Dashboard </p>
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
              <img src={diamond} alt="contact" />
              <div className="first_object circle"></div>
            </div>
          </section>
        </div>
      </div>
      <section className="container">
        <ul className="dashboard-navbar">
          <li
            className={`dashboard-navbar-link ${
              navbar === "all" ? "active" : ""
            }`}
            onClick={() => handleNavclick("all")}
          >
            All
          </li>
          <li
            className={`dashboard-navbar-link ${
              navbar === "listed" ? "active" : ""
            }`}
            onClick={() => handleNavclick("listed")}
          >
            Listed
          </li>
          <li
            className={`dashboard-navbar-link ${
              navbar === "onSale" ? "active" : ""
            }`}
            onClick={() => handleNavclick("onSale")}
          >
            On Sale
          </li>
          <li
            className={`dashboard-navbar-link ${
              navbar === "purchased" ? "active" : ""
            }`}
            onClick={() => handleNavclick("purchased")}
          >
            Purchased
          </li>
        </ul>
      </section>

      {navbar === "all" ? (
        <ProfileAllNfts />
      ) : navbar === "listed" ? (
        <ProfileListedNfts />
      ) : navbar === "onSale" ? (
        <ProfileOnSaleNfts />
      ) : navbar === "purchased" ? (
        <ProfilePurchasedNfts />
      ) : null}
    </div>
  );
}

export default Dashboard;
