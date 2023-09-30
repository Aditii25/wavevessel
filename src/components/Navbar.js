import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import CustomWalletConnect from "./CustomWalletConnect";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";

function Navbar() {
  const { address } = useAccount();
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-row">
          <Link className="logo" to="/">
            <img src={logo} alt="Logo" />
            <span>Wave Vessel</span>
          </Link>
          <div className="button-container">
            <Link to="/explore/base/all">Explore</Link>
            {address ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
              </>
            ) : null}
            <CustomWalletConnect />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
