import React, { useEffect, useState } from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";
import CustomProgressBar from "./CustomProgressBar";
import { ethers } from "ethers";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
import { useAccount } from "wagmi";
const contractAddress = "0x6ae147496eC85ec87769C17cD41EB1283D42f014";

function ProfilePurchasedNfts() {
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
      const result = await contract.getBuyerData(address);
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
        let url = `https://api.opensea.io/v2/chain/base/contract/${result[i].tokenAddress}/nfts/1`;
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`Fetch error: ${response.statusText}`);
          }
          const data = await response.json();
          console.log(data);
          const ethAmount = ethers.utils.formatUnits(
            parseInt(result[i].flowRate),
            "ether"
          );
          data.nft.flowRateInEth = ethAmount;
          data.nft.identifier = parseInt(result[i].tokenId);
          let timeStart = parseInt(result[i].timeStarted);
          const startdate = new Date(timeStart * 1000);

          const price = ethers.utils.formatUnits(
            parseInt(result[i].price),
            "ether"
          );
          const flowRate = ethers.utils.formatUnits(
            parseInt(result[i].flowRate),
            "ether"
          );
          const timeStarted = parseInt(result[i].timeStarted);

          console.log(price / flowRate);
          const durationSeconds = price / flowRate;
          const timeStopped = durationSeconds / 1000 + timeStarted * 1000;
          console.log(timeStopped);
          const stoppedate = timeStopped ? new Date(timeStopped) : null;
          data.nft.streamStartedDate = startdate;
          data.nft.streamStoppedDate = stoppedate;
          data.nft.priceInEth = price;

          const currentTimeEpoch = Math.floor(Date.now() / 1000);

          // Calculate the time duration in seconds since the stream started
          const timeElapsedSeconds =
            currentTimeEpoch - parseInt(result[i].timeStarted);

          // Calculate the pending amount in Wei
          const pendingAmount =
            parseInt(result[i].flowRate) * timeElapsedSeconds;

          // Calculate the remaining NFT price in Wei
          const remainingNftPrice = result[i].price - pendingAmount;

          // Calculate the transfer percentage
          const percentageTransferred =
            ((parseInt(result[i].price) - remainingNftPrice) /
              parseInt(result[i].price)) *
            100;
          console.log(percentageTransferred);
          data.nft.transferredAmountPercentage = 100 - percentageTransferred;
          arr.push(data.nft);
          // If nextPageCursor is null, reset the nfts array
          // Update the next page cursor
        } catch (error) {
          console.error(error);
        }
      }

      console.log(arr);

      const mergedArray = arr.map((item1) => {
        const matchingItem2 = result.find(
          (item2) => item2.contract === item1.tokenAddress
        );
        if (matchingItem2) {
          // Merge properties from both arrays into a single object
          return {
            ...item1,
            ...matchingItem2,
          };
        } else {
          // If no matching item in array2, return item1 as is
          return item1;
        }
      });
      // console.log(parseInt(mergedArray[0].flowRate));
      console.log(mergedArray);
      setListingNFTs(mergedArray);
    } catch (error) {
      console.error("Error fetching sellers: ", error);
    }
  };
  return (
    <div>
      <section className="container nft-bg sold-nfts ">
        <div className="explore-nfts">
          {listingNFTs.length > 0 &&
            listingNFTs.map((nft) => (
              <div className="nft-item" key={nft.identifier}>
                <div className="nft-item-inside-one">
                  <div className="product_image">
                    <img
                      src={nft.image_url ? nft.image_url : nft1}
                      alt=""
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="product-content ">
                    <div className="product-content-sections">
                      <p className="title">Name</p>
                      <p className="value nft-name">
                        {nft.name
                          ? nft.name
                          : "the-amazing-game #" + nft.identifier}
                      </p>
                    </div>
                    <div className="product-content-sections">
                      <p className="title">Stream Receiver</p>
                      <p className="value">{nft.seller ? nft.seller : null}</p>
                    </div>
                    <div className="product-content-sections">
                      <p className="title">Price</p>
                      <p className="value">
                        {nft.priceInEth ? nft.priceInEth : 0} Dai
                      </p>
                    </div>
                  </div>
                  <div className="product-content ">
                    <div className="product-content-sections">
                      <p className="title">Flow Rate</p>
                      <p className="value">
                        {nft.flowRateInEth ? nft.flowRateInEth : 0} daix/Sec
                      </p>
                    </div>
                    <div className="product-content-sections">
                      <p className="title">Start Date</p>
                      <p className="value">
                        {nft.streamStartedDate.toString()}
                      </p>
                    </div>
                    <div className="product-content-sections">
                      <p className="title">End Date(Est.)</p>
                      <p className="value">
                        {nft.streamStoppedDate.toString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="nft-item-inside-two">
                  <div className="status-bar">
                    <div>
                      <span className="value progress-title">Status :- </span>
                      <span className="value progress-title active">
                        Active
                      </span>
                    </div>
                    <div className="wallet_parent">
                      <button className="wallet_button">Revoke</button>
                    </div>
                  </div>
                  <CustomProgressBar width={nft.transferredAmountPercentage} />
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default ProfilePurchasedNfts;
