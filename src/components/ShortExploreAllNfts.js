import React, { useEffect, useState } from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import { Link } from "react-router-dom";
import rightArrow from "../assets/right-arrow.svg";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import contractAbi from "../contract/PurchaseNFTOverTime.json";
const contractAddress = "0x6ae147496eC85ec87769C17cD41EB1283D42f014";

function ShortExploreAllNfts() {
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
              listingNFTs.map((nft) => (
                <div className="nft-item">
                  <Link
                    className="product_image"
                    to="/shop/product"
                    state={{
                      nft_image: nft[0].image_url ? nft[0].image_url : nft1,
                    }}
                  >
                    <img
                      src={nft[0].image_url ? nft[0].image_url : nft1}
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
                      <span className="listing-price-title">Listing Price</span>
                      <span className="listing-price-value">
                        {nft[0].price} Dai
                      </span>
                    </div>
                    <div className="explore-buy">
                      <Link
                        className="explore-buy-button"
                        to="/shop/product"
                        state={{
                          nft_image: nft.image_url ? nft.image_url : nft1,
                        }}
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>{" "}
          <div class="products__footer">
            <Link
              to="/explore/base/all"
              rel="follow"
              target="_self"
              class="products__btn main-btn"
            >
              <div class="main-btn__name">
                <p>Explore all collections</p>
              </div>
              <div class="main-btn__icon">
                <img
                  decoding="async"
                  src="https://alethemes.com/onchain/wp-content/themes/onchain/assets/images/arrow-right.svg"
                  alt="category"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShortExploreAllNfts;
