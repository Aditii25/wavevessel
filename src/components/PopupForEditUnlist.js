import React from "react";
import "./PopupForEditUnlist.css";

function PopupForEditUnlist(props) {
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
                  defaultValue={props.showPopup.price}
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
              onClick={() =>
                props.setShowPopup({
                  show: false,
                  price: "",
                  type: "",
                  tokenAddress: "",
                  tokenId: "",
                })
              }
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
