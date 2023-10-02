import React, { useEffect, useState } from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";
import CustomProgressBar from "./CustomProgressBar";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
const contractAddress = "0x052a21C9BD5fe374A5bAbd79Bfbd9EC9E6Cf0d7A";

function ProfileOnSaleNfts() {
  const [sellers, setSellers] = useState([]);
  const [provider, setProvider] = useState(null);
  const { address } = useAccount();

  useEffect(() => {
    // Initialize ethers provider
    if (window.ethereum) {
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(newProvider);
    }
  }, []);

  useEffect(() => {
    // Fetch sellers when provider is initialized
    if (provider) {
      getBuyerData();
    }
  }, [provider]);

  const getBuyerData = async () => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        provider
      );
      const result = await contract.getBuyerData(address);
      console.log(result);
      setSellers(result);
    } catch (error) {
      console.error("Error fetching sellers: ", error);
    }
  };
  return (
    <div>
      <section className="container nft-bg sold-nfts ">
        <div className="explore-nfts">
          <div className="nft-item">
            {/* <div className="nft-item-inside-one">
              <div className="product_image">
                <img src={nft3} alt="" decoding="async" loading="lazy" />
              </div>
              <div className="product-content ">
                <div className="product-content-sections">
                  <p className="title">Name</p>
                  <p className="value nft-name">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsa, modi! lorem50
                  </p>
                </div>
                <div className="product-content-sections">
                  <p className="title">Sender</p>
                  <p className="value">0x29236vb...jkaia</p>
                </div>
                <div className="product-content-sections">
                  <p className="title">Price</p>
                  <p className="value">0.01 fdai</p>
                </div>
              </div>
              <div className="product-content ">
                <div className="product-content-sections">
                  <p className="title">Flow Rate</p>
                  <p className="value">0.0001 fdaix/Sec</p>
                </div>
                <div className="product-content-sections">
                  <p className="title">Start Date</p>
                  <p className="value">25th Sept 2023</p>
                </div>
                <div className="product-content-sections">
                  <p className="title">End Date(Est.)</p>
                  <p className="value">30th Sept 2023</p>
                </div>
              </div>
            </div>
            <div className="nft-item-inside-two">
              <span className="value progress-title">Status :- </span>
              <CustomProgressBar width={70} />
            </div> */}
            <div className="no-nfts">
              No one has bought any of your NFTs till now
            </div>
          </div>{" "}
        </div>
      </section>
    </div>
  );
}

export default ProfileOnSaleNfts;
