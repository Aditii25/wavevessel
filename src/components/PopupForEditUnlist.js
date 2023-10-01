import React, { useState } from "react";
import "./PopupForEditUnlist.css";
import { ethers } from "ethers";
import closeSvg from "../assets/clear_white_24dp.svg";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
const contractAddress = "0x6ae147496eC85ec87769C17cD41EB1283D42f014";

function PopupForEditUnlist(props) {
  const [nftPrice, setnftPrice] = useState(props.showPopup.price);
  const [buttonText, setButtonText] = useState(
    props.showPopup.type === "edit" ? "Save" : "Yes"
  );

  const EditListing = async (nftId, nftAddress) => {
    setButtonText(
      props.showPopup.type === "edit" ? "Saving Listed NFT" : "Yes"
    );
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );
        console.log(contract);
        const ethAmount = nftPrice; // Replace this with the amount of Ether you want to convert

        // Convert ETH to Wei
        const weiAmount = ethers.utils.parseEther(ethAmount.toString());

        const tx = await contract.editSale(weiAmount, nftId, nftAddress);
        await tx.wait();
        console.log("Edited");
        setButtonText(props.showPopup.type === "edit" ? "Saved" : "Yes");
        setTimeout(() => {
          setButtonText(props.showPopup.type === "edit" ? "Save" : "Yes");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setButtonText(props.showPopup.type === "edit" ? "Save" : "Yes");
    }
  };
  const cancelListing = async (nftId, nftAddress) => {
    setButtonText(props.showPopup.type === "edit" ? "Save" : "Unlisting NFT");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        console.log(process.env.REACT_APP_CONTRACT_ADDRESS);

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );
        console.log(contract);

        const tx = await contract.cancelSale(nftId, nftAddress);
        await tx.wait();
        console.log("NFT Unlisted");
        setButtonText(
          props.showPopup.type === "edit" ? "Saved" : "NFT Unlisted"
        );
        setTimeout(() => {
          setButtonText(props.showPopup.type === "edit" ? "Save" : "Yes");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setButtonText(props.showPopup.type === "edit" ? "Save" : "Yes");
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
                  })
                }
              />
            </div>
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
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupForEditUnlist;
