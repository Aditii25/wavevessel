import React, { useEffect, useState } from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";
import "./ProfileNfts.css";
import PopupForEditUnlist from "./PopupForEditUnlist";
import { ethers } from "ethers";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
import { useAccount } from "wagmi";
const contractAddress = "0x6ae147496eC85ec87769C17cD41EB1283D42f014";

function ProfileListedNfts() {
  const [showPopup, setShowPopup] = useState({
    show: false,
    tokenId: "",
    type: "",
    tokenAddress: "",
    price: "",
  });

  const [listingNFTs, setListingNFTs] = useState([]);
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
      getSellerData();
    }
  }, [provider]);

  const getSellerData = async () => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        provider
      );
      const result = await contract.getSellerData(address);
      console.log(result);
      let arr = [];
      const apiKey = "e64d85a397004d18ba1287e9c59bb553";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": apiKey,
        },
      };
      for (let i = 0; i < result.length; i++) {
        if (!result[i].isSold) {
          let url = `https://api.opensea.io/v2/chain/base/contract/${result[i].tokenAddress}/nfts/1`;
          try {
            const response = await fetch(url, options);
            if (!response.ok) {
              throw new Error(`Fetch error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            const ethAmount = ethers.utils.formatUnits(
              parseInt(result[i].price),
              "ether"
            );
            data.nft.price = ethAmount;
            data.nft.identifier = result[i].tokenId;
            arr.push(data.nft);
            // If nextPageCursor is null, reset the nfts array
            // Update the next page cursor
          } catch (error) {
            console.error(error);
          }
        }
      }
      console.log(arr);
      setListingNFTs(arr);
    } catch (error) {
      console.error("Error fetching sellers: ", error);
    }
  };
  return (
    <div>
      <section className="container nft-bg">
        <div className="explore-nfts">
          {listingNFTs.length > 0 &&
            listingNFTs.map((nft) => (
              <div className="nft-item" key={nft.identifier}>
                <div className="product_image">
                  <img
                    src={nft.image_url ? nft.image_url : nft1}
                    alt=""
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div className="product-content">
                  <p className="nft-title">
                    {nft.name
                      ? nft.name
                      : "the-amazing-game #" + nft.identifier}
                  </p>
                  <div className="listing-price-parent">
                    <span className="listing-price-title">Listing Price</span>
                    <span className="listing-price-value">{nft.price} dai</span>
                  </div>
                  <div className="listing-buttons">
                    <button
                      className="listing-edit-button"
                      onClick={() => {
                        setShowPopup({
                          show: true,
                          type: "edit",
                          price: nft.price,
                          tokenAddress: nft.contract,
                          tokenId: nft.identifier,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="listing-cancle-button"
                      onClick={() => {
                        setShowPopup({
                          show: true,
                          type: "unlist",
                          price: "",
                          tokenAddress: "0x29njjs",
                          tokenId: "1234",
                        });
                      }}
                    >
                      Unlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      {showPopup.show ? (
        <PopupForEditUnlist setShowPopup={setShowPopup} showPopup={showPopup} />
      ) : null}
    </div>
  );
}

export default ProfileListedNfts;
