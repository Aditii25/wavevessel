import React, { useEffect, useState } from "react";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import nft5 from "../assets/nft5.png";
import nft6 from "../assets/nft6.png";
import nft7 from "../assets/nft7.png";
import nft8 from "../assets/nft8.png";
import nft9 from "../assets/nft9.jpg";
import nft10 from "../assets/nft10.jpg";
import { Link } from "react-router-dom";
import PopupForSellNFT from "./PopupForSellNFT";
import { useAccount } from "wagmi";

function ProfileAllNfts() {
  const [nfts, setNfts] = useState([]);
  const { address } = useAccount();
  const [nextPageCursor, setNextPageCursor] = useState(null);
  const [showPopup, setShowPopup] = useState({
    show: false,
    tokenId: "",
    tokenAddress: "",
  });
  const fetchNFTs = async () => {
    if (!address) {
      return; // Don't fetch if no wallet is connected
    }

    const apiKey = "e64d85a397004d18ba1287e9c59bb553";
    let url = `https://api.opensea.io/v2/chain/base/account/${address}/nfts?limit=10`;

    // Add the cursor if available
    if (nextPageCursor) {
      url += `&next=${nextPageCursor}`;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": apiKey,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      // If nextPageCursor is null, reset the nfts array
      const updatedNfts = nextPageCursor ? [...nfts, ...data.nfts] : data.nfts;
      setNfts(updatedNfts); // Update the NFTs array
      setNextPageCursor(data.next); // Update the next page cursor
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchNFTs();
  }, [address]);

  return (
    <div>
      <section className="second-section single-product-explore-nfts">
        <div className="container">
          <div className="explore-nfts">
            {nfts.length > 0 &&
              nfts.map((nft) => (
                <div className="nft-item" key={nft.identifier}>
                  <div className="product_image">
                    <img
                      src={nft.image_url ? nft.image_url : nft1}
                      alt={nft.image_url}
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
                    <div className="explore-buy">
                      <div
                        className="explore-buy-button"
                        onClick={() => {
                          setShowPopup({
                            show: true,
                            tokenId: parseInt(nft.identifier),
                            tokenAddress: nft.contract,
                          });
                        }}
                      >
                        List Now
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>{" "}
          {nextPageCursor && (
            <button onClick={() => fetchNFTs()}>{`Load More`}</button>
          )}
        </div>
      </section>
      {showPopup.show ? (
        <PopupForSellNFT showPopup={showPopup} setShowPopup={setShowPopup} />
      ) : null}
    </div>
  );
}

export default ProfileAllNfts;
