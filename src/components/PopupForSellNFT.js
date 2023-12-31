import React, { useState } from "react";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
import erc721Abi from "../contract/ERC721.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import closeSvg from "../assets/clear_white_24dp.svg";
const contractAddress = "0x6ae147496eC85ec87769C17cD41EB1283D42f014";

function PopupForSellNFT(props) {
  const [nftPrice, setnftPrice] = useState("");
  const [buttonText, setButtonText] = useState("List Now");
  const { address } = useAccount();

  const PutOnSale = async (nftId, nftAddress) => {
    setButtonText("Listing...");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const erc721ContractAddress = ethers.utils.getAddress(nftAddress);
        const erc721Contract = new ethers.Contract(
          erc721ContractAddress,
          erc721Abi.abi,
          signer
        );
        const checkApprove = await erc721Contract.isApprovedForAll(
          address,
          contractAddress
        );
        console.log(checkApprove);
        if (!checkApprove) {
          const transx = await erc721Contract.setApprovalForAll(
            contractAddress,
            true
          );
          await transx.wait();
          console.log("approved");
        }

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );
        console.log(contract);
        const ethAmount = nftPrice; // Replace this with the amount of Ether you want to convert

        // Convert ETH to Wei
        const weiAmount = ethers.utils.parseEther(ethAmount.toString());
        console.log(nftId, weiAmount.toString(), nftAddress);
        const tx = await contract.putOnSale(nftId, weiAmount, nftAddress);
        await tx.wait();
        console.log("on sale");
        setButtonText("Listed Successfully");
        setTimeout(() => {
          setButtonText("List Now");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setButtonText("List Now");
    }
  };
  return (
    <div>
      <div class="popup-overlay">
        <div class="popup-container">
          <div class="popup-card">
            <div className="close-popup">
              <img
                src={closeSvg}
                alt="close icon"
                className="close-icon"
                onClick={() =>
                  props.setShowPopup({
                    show: false,
                    tokenId: "",
                    tokenAddress: "",
                  })
                }
              />
            </div>
            <h2>
              {props.showPopup && props.showPopup.type === "edit"
                ? "List NFT for Sale"
                : ""}
            </h2>
            <div className="buy_nft_fields">
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Token Address</span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">
                    {props.showPopup.tokenAddress}
                  </span>
                </div>
              </div>
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">Token Id</span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">
                    {" "}
                    {props.showPopup.tokenId}
                  </span>
                </div>
              </div>
              <div className="buy_nft_field_item">
                <div className="buy_nft_field_title">
                  <span className="field_title">NFT Price </span>
                  <span className="field_info"></span>
                </div>
                <div className="buy_nft_field_input buy_nft_period">
                  <span className="buy_nft_period_time">
                    <input
                      type="text"
                      className="field_item_input"
                      onChange={(e) => {
                        setnftPrice(e.target.value);
                      }}
                    />
                  </span>
                </div>
              </div>

              <div
              // className={`buy_nft_field_item last_item ${
              //   !flowRate ? "disabled" : ""
              // }`}
              >
                <div className="buy-nft-parent">
                  <span
                    className="buy-nft"
                    onClick={() =>
                      PutOnSale(
                        props.showPopup.tokenId,
                        props.showPopup.tokenAddress
                      )
                    }
                  >
                    {buttonText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupForSellNFT;
