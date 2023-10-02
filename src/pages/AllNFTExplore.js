import React, { useEffect, useState } from "react";
import rocket from "../assets/rocket.png";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
import { useAccount } from "wagmi";
const contractAddress = "0x6ae147496eC85ec87769C17cD41EB1283D42f014";

function AllNFTExplore() {
  const [listingNFTs, setListingNFTs] = useState([]);

  const getSellerData = async () => {
    try {
      const newProvider = new ethers.providers.JsonRpcProvider(
        "https://1rpc.io/base"
      );

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        newProvider
      );
      const sellers = await contract.getSellers();
      console.log(sellers);
      let finalArr = [];
      for (let j = 0; j < sellers.length; j++) {
        const result = await contract.getSellerData(sellers[j]);
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
          console.log(result[i].isSold);
          if (!result[i].isSold) {
            console.log("inside");
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
              data.nft.nftOwner = result[i].seller;
              data.nft.price = ethAmount;
              data.nft.identifier = parseInt(result[i].tokenId);
              arr.push(data.nft);
              // If nextPageCursor is null, reset the nfts array
              // Update the next page cursor
            } catch (error) {
              console.error(error);
            }
          }
        }
        console.log(arr);
        finalArr.push(arr);
      }
      console.log(finalArr);

      setListingNFTs(finalArr);
    } catch (error) {
      console.error("Error fetching sellers: ", error);
    }
  };
  useEffect(() => {
    // Fetch sellers when provider is initialized
    getSellerData();
  }, []);
  return (
    <div>
      <div className="single_product">
        <div className="first_heading">
          <section className="container">
            <div className="first_wrapper">
              <div className="first_content">
                <div className="first_title">
                  <p>Explore </p>
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
      <section className="second-section single-product-explore-nfts">
        <div className="container">
          <div>
            <div className="second-title">
              <p>COLLECTIONS</p>
            </div>
            <div className="second-main-title">
              <p>
                Explore <span>NFTs</span>
              </p>
            </div>
          </div>
          <div className="explore-nfts">
            {listingNFTs.length > 0 &&
              listingNFTs
                .filter((nft) => nft[0] && nft[0].price)
                .map((nft) => (
                  <div className="nft-item" key={nft[0] && nft[0].identifier}>
                    <Link
                      className="product_image"
                      to="/shop/product"
                      state={{
                        nft: nft,
                      }}
                    >
                      <img
                        src={
                          nft[0] && nft[0].image_url ? nft[0].image_url : nft1
                        }
                        alt=""
                        decoding="async"
                        loading="lazy"
                      />
                    </Link>
                    <div className="product-content">
                      <p className="nft-title">
                        {nft[0].name
                          ? nft[0].name
                          : "the-amazing-game #" + nft[0].identifier}
                      </p>
                      <div className="listing-price-parent">
                        <span className="listing-price-title">
                          Listing Price
                        </span>
                        <span className="listing-price-value">
                          {nft[0] ? nft[0].price : 0} Dai
                        </span>
                      </div>
                      <div className="explore-buy">
                        <Link
                          className="explore-buy-button"
                          to="/shop/product"
                          state={{
                            nft: nft,
                          }}
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllNFTExplore;
