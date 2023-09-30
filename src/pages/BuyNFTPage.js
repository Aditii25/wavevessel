import React, { useEffect, useState } from "react";
import "./BuyNFTPage.css";
import { Link, useParams } from "react-router-dom";
import rocket from "../assets/rocket.png";
import nft1 from "../assets/nft1.png";
import { ethers } from "ethers";
import erc20Abi from "../contract/IERC20.json";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
import { Framework } from "@superfluid-finance/sdk-core";

function BuyNFTPage() {
  const { chain, tokenId, contractAddress } = useParams();

  const [flowRate, setFlowRate] = useState(null);
  const [price, setPrice] = useState(0.36);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    console.log(chain, tokenId, contractAddress);
  });

  useEffect(() => {
    const calculateEndTime = () => {
      if (flowRate > 0) {
        const remainingEth = price / flowRate;
        const currentTime = new Date();
        const estimatedEndTime = new Date(
          currentTime.getTime() + remainingEth * 1000
        ); // Convert seconds to milliseconds

        setEndTime(estimatedEndTime);
      } else {
        setEndTime(null);
      }
    };

    calculateEndTime();
  }, [flowRate, price]);

  const BuyNFTOverTime = async (sellerAddress, tokenAddress, tokenId) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const sf = await Framework.create({
          chainId: 84531,
          provider: provider,
        });

        const daix = await sf.loadSuperToken("fDAIx");

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );

        const ethAmount = flowRate; // Replace this with the amount of Ether you want to convert

        // Convert ETH to Wei
        const weiAmount = ethers.utils.parseEther(ethAmount.toString());

        const erc20ContractAddress = ethers.utils.getAddress(
          "0x5735C32C38f5Af0FB04a7c77C832Ba4D7aBfFeC8"
        );
        const erc20Contract = new ethers.Contract(
          erc20ContractAddress,
          erc20Abi.abi,
          signer
        );

        // const approve = erc20Contract.approve(
        //   contractAddress,
        //   "1000000000000000000"
        // );
        // console.log("approved");

        const tx = await contract.BuyNFTOverTime(
          sellerAddress,
          tokenAddress,
          tokenId,
          weiAmount,
          erc20ContractAddress,
          daix.address
        );
        await tx.wait();
        console.log("bought");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="single_product">
        <div className="first_heading">
          <section className="container">
            <div className="first_wrapper">
              <div className="first_content">
                <div className="first_title">
                  <p>Purchase </p>
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

      <section className="container buy-nft-page-parent">
        <div className="buy-nft-page">
          <div className="buy-nft-left-parent">
            <div className="nft-image">
              <img src={nft1} alt="base network" />
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
              </div>
            </div>
          </div>

          <div className="buy-nft-right-parent">
            <div
              className="powered-by-main-title"
              style={{ margin: "10px auto", marginTop: "30px" }}
            >
              <p>
                Buy <span>NFT</span>
              </p>
            </div>
            <div className="buy_nft_fields">
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Seller Address</span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">0xajka...9287x</span>
                </div>
              </div>
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Token Address</span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">0xajka...9287x</span>
                </div>
              </div>
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Token ID</span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">1234</span>
                </div>
              </div>
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Flow Rate ( fDaix/sec ) </span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">
                    <input
                      type="text"
                      className="field_item_input"
                      onChange={(e) => {
                        setFlowRate(e.target.value);
                      }}
                    />
                  </span>
                </div>
              </div>
              {endTime ? (
                <div className="buy_nft_field_item">
                  <div className="buy_nft_field_title">
                    <span className="field_title">
                      Estimated Stream End Time
                    </span>
                    <span className="field_info"></span>
                  </div>
                  <div className="buy_nft_field_input buy_nft_period">
                    <span className="buy_nft_period_time">
                      {endTime ? endTime.toString() : ""}
                    </span>
                  </div>
                </div>
              ) : null}
              <div
                className={`buy_nft_field_item last_item ${
                  !flowRate ? "disabled" : ""
                }`}
              >
                <div className="buy-nft-parent">
                  <span className="buy-nft">Buy Now With Superfluid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BuyNFTPage;