import React, { useEffect, useState } from "react";
import "./BuyNFTPage.css";
import { Link, useLocation, useParams } from "react-router-dom";
import rocket from "../assets/rocket.png";
import nft1 from "../assets/nft1.png";
import { ethers } from "ethers";
import erc20Abi from "../contract/IERC20.json";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
import { Framework } from "@superfluid-finance/sdk-core";

const contractAddress = "0x6ae147496eC85ec87769C17cD41EB1283D42f014";

function BuyNFTPage() {
  const location = useLocation();
  console.log(location.state ? location.state.nft : null);
  const [nft, setNft] = useState(location.state ? location.state.nft : null);

  const [flowRate, setFlowRate] = useState(null);
  const [price, setPrice] = useState(nft[0].price);
  const [endTime, setEndTime] = useState(null);
  const [buttonText, setButtonText] = useState("Buy Now With Superfluid");

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

  const BuyNFTOverTime = async () => {
    setButtonText("Waiting...");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        const sf = await Framework.create({
          chainId: 8453,
          provider: provider,
        });

        const daix = await sf.loadSuperToken("DAIx");

        console.log(daix);
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );

        const ethAmount = flowRate; // Replace this with the amount of Ether you want to convert

        // Convert ETH to Wei
        const weiAmount = ethers.utils.parseEther(ethAmount);
        console.log(parseInt(weiAmount));

        const erc20ContractAddress = ethers.utils.getAddress(
          "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"
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
        // console.log(approve);
        console.log(
          contract,
          nft[0].nftOwner,
          nft[0].contract,
          nft[0].identifier,
          parseInt(weiAmount),
          parseInt(weiAmount),
          erc20ContractAddress,
          daix.address
        );
        const tx = await contract.BuyNFTOverTime(
          nft[0].nftOwner,
          nft[0].contract,
          nft[0].identifier,
          weiAmount,
          weiAmount,
          erc20ContractAddress,
          daix.address
        );
        // Adjust the gas price as needed;
        await tx.wait();
        console.log("bought");
        setButtonText("Stream Started!!!");
        setTimeout(() => {
          setButtonText("Buy Now With Superfluid");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setButtonText("Buy Now With Superfluid");
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
              <img
                src={nft[0].image_url ? nft[0].image_url : nft1}
                alt="base network"
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
                <span className="address">
                  {nft[0].nftOwner.slice(0, 5) +
                    "..." +
                    nft[0].nftOwner.slice(
                      nft[0].nftOwner.length - 5,
                      nft[0].nftOwner.length
                    )}
                </span>
              </div>
              <div className="nft-owner">
                <span>Collection</span>
                <span className="address">{nft[0].collection}</span>
              </div>
              <div className="nft-owner">
                <span>Contract Address</span>
                <span className="address">
                  {nft[0].contract.slice(0, 5) +
                    "..." +
                    nft[0].contract.slice(
                      nft[0].contract.length - 5,
                      nft[0].contract.length
                    )}
                </span>
              </div>
              <div className="nft-owner">
                <span>On Sale For</span>
                <h1 className="nft-cost-main">
                  {nft[0].price}
                  <span title="Base NFT cost" className="nft-cost-price">
                    fdai
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
                  <span className="buy_nft_period_time">
                    {nft[0].nftOwner.slice(0, 5) +
                      "..." +
                      nft[0].nftOwner.slice(
                        nft[0].nftOwner.length - 5,
                        nft[0].nftOwner.length
                      )}
                  </span>
                </div>
              </div>
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Token Address</span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">
                    {nft[0].contract.slice(0, 5) +
                      "..." +
                      nft[0].contract.slice(
                        nft[0].contract.length - 5,
                        nft[0].contract.length
                      )}
                  </span>
                </div>
              </div>
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Token ID</span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">
                    {nft[0].identifier}
                  </span>
                </div>
              </div>
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Flow Rate ( Daix/sec ) </span>
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
                  <span className="buy-nft" onClick={() => BuyNFTOverTime()}>
                    {buttonText}
                  </span>
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
