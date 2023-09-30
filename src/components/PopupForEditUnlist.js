import React, { useState } from "react";
import "./PopupForEditUnlist.css";
import { ethers } from "ethers";
import contractAbi from "../contract/PurchaseNFTOverTime.json";

function PopupForEditUnlist(props) {
  const [nftPrice, setnftPrice] = useState(props.showPopup.price);

  const EditListing = async (nftId, nftAddress) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        console.log(process.env.REACT_APP_CONTRACT_ADDRESS);

        const contract = new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          contractAbi.abi,
          signer
        );
        console.log(contract);
        const ethAmount = nftPrice; // Replace this with the amount of Ether you want to convert

        // Convert ETH to Wei
        const weiAmount = ethers.utils.parseEther(ethAmount.toString());
        console.log(nftId, weiAmount.toString(), nftAddress);
        const tx = await contract.editSale(
          "5000000000000000",
          nftId,
          nftAddress
        );
        await tx.wait();
        console.log("Edited");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelListing = async (nftId, nftAddress) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        console.log(process.env.REACT_APP_CONTRACT_ADDRESS);

        const contract = new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          contractAbi.abi,
          signer
        );
        console.log(contract);

        const tx = await contract.cancelSale(nftId, nftAddress);
        await tx.wait();
        console.log("Edited");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div class="popup-overlay">
        <div class="popup-container">
          <div class="popup-card">
            <h2>
              {props.showPopup && props.showPopup.type === "edit"
                ? "Edit Listing Price"
                : "Unlist NFT"}
            </h2>
            <p>
              {props.showPopup && props.showPopup.type === "edit"
                ? "To change the listing price please enter in the below input and press the Save button"
                : "Are you sure you want to unlist this NFT?"}
            </p>
            {props.showPopup.price ? (
              <div className="popup-input-parent">
                <input
                  type="text"
                  className="popup-input"
                  defaultValue={nftPrice}
                  onChange={(e) => {
                    setnftPrice(e.target.value);
                  }}
                />
              </div>
            ) : null}
            <button
              id="close-popup"
              className={
                props.showPopup && props.showPopup.type === "edit"
                  ? "edit-button"
                  : "unlist-button"
              }
              onClick={() => {
                if (props.showPopup.type === "edit") {
                  EditListing(
                    props.showPopup.tokenId,
                    props.showPopup.tokenAddress
                  );
                } else if (props.showPopup.type === "unlist") {
                  cancelListing(
                    props.showPopup.tokenId,
                    props.showPopup.tokenAddress
                  );
                }
              }}
            >
              {props.showPopup && props.showPopup.type === "edit"
                ? "Save"
                : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupForEditUnlist;
