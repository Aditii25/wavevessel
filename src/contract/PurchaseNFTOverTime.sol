// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

contract PurchaseNFTOverTime is IERC721Receiver {
    using SuperTokenV1Library for ISuperToken;

    constructor() {
        admin = msg.sender;
    }

    address public admin;
    struct Tokens {
        uint tokenId;
        address tokenAddress;
        address seller;
        address buyer;
        uint price; // price in fdai
        bool isSold;
    }
    address[] public sellers;
    mapping(address => bool) public sellerAdded;
    mapping(address => Tokens[]) public addressToTokens;

    struct Buyer {
        address user;
        address seller;
        address tokenAddress;
        uint tokenId;
        int96 flowRate;
        uint timeStarted;
        uint timeStopped;
        uint estimatedTime;
        uint price;
    }
    address[] public buyers;
    mapping(address => bool) public isBuyerAdded;
    mapping(address => Buyer[]) public addressToBuyer;

    function putOnSale(
        uint _tokenId,
        uint _price,
        address _tokenAddress
    ) public {
        if (sellerAdded[msg.sender] == false) {
            sellers.push(msg.sender);
            sellerAdded[msg.sender] = true;
        }
        addressToTokens[msg.sender].push(
            Tokens(
                _tokenId,
                _tokenAddress,
                msg.sender,
                address(0),
                _price,
                false
            )
        );
        // transfer nft into contract
        ERC721(_tokenAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId
        );
    }

    function editSale(
        uint _price,
        uint _tokenId,
        address _tokenAddress
    ) public {
        for (uint i = 0; i < addressToTokens[msg.sender].length; i++) {
            if (
                addressToTokens[msg.sender][i].tokenId == _tokenId &&
                addressToTokens[msg.sender][i].tokenAddress == _tokenAddress
            ) {
                if (
                    addressToTokens[msg.sender][i].seller == msg.sender &&
                    addressToTokens[msg.sender][i].isSold == false
                ) {
                    // return nft to the seller
                    addressToTokens[msg.sender][i].price = _price;
                    break;
                } else {
                    revert("You can only cancel unsold NFTs that you own.");
                }
            }
        }
    }

    function cancelSale(uint _tokenId, address _tokenAddress) public {
        for (uint i = 0; i < addressToTokens[msg.sender].length; i++) {
            if (
                addressToTokens[msg.sender][i].tokenId == _tokenId &&
                addressToTokens[msg.sender][i].tokenAddress == _tokenAddress
            ) {
                if (
                    addressToTokens[msg.sender][i].seller == msg.sender &&
                    addressToTokens[msg.sender][i].isSold == false
                ) {
                    // return nft to the seller
                    ERC721(addressToTokens[msg.sender][i].tokenAddress)
                        .safeTransferFrom(address(this), msg.sender, _tokenId);
                    delete addressToTokens[msg.sender][i];
                    break;
                } else {
                    revert("You can only cancel unsold NFTs that you own.");
                }
            }
        }
    }

    function BuyNFTOverTime(
        address _seller,
        address _tokenAddress,
        uint _tokenId,
        int96 _flowrate,
        address _erc20,
        ISuperToken token
    ) public payable {
        for (uint i = 0; i < addressToTokens[_seller].length; i++) {
            if (
                addressToTokens[_seller][i].tokenAddress == _tokenAddress &&
                addressToTokens[_seller][i].tokenId == _tokenId
            ) {
                if (addressToTokens[_seller][i].isSold == false) {
                    if (isBuyerAdded[msg.sender] == false) {
                        buyers.push(msg.sender);
                        isBuyerAdded[msg.sender] = true;
                    }
                    // colletral
                    IERC20(_erc20).transferFrom(
                        msg.sender,
                        address(this),
                        addressToTokens[_seller][i].price
                    );
                    // require(msg.value == tokens[_seller][_tokenId].price,"You must have to put colletral of the same amount");
                    addressToBuyer[msg.sender].push(
                        Buyer(
                            msg.sender,
                            _seller,
                            _tokenAddress,
                            _tokenId,
                            _flowrate,
                            block.timestamp,
                            0,
                            0,
                            addressToTokens[_seller][i].price
                        )
                    );
                    addressToTokens[_seller][i].isSold = true;
                    addressToTokens[_seller][i].buyer = msg.sender;
                    // start stream here
                    if (token.getFlowRate(msg.sender, address(this)) == 0) {
                        createFlowIntoContract(token, _flowrate);
                    } else {
                        updateFlowIntoContract(
                            token,
                            (token.getFlowRate(msg.sender, address(this)) +
                                _flowrate),
                            msg.sender
                        );
                    }

                    if (token.getFlowRate(address(this), _seller) == 0) {
                        createFlowFromContract(token, _seller, _flowrate);
                    } else {
                        updateFlowFromContract(
                            token,
                            _seller,
                            token.getFlowRate(address(this), _seller) +
                                _flowrate
                        );
                    }
                    break;
                } else {
                    revert("Token is already sold");
                }
            }
        }
    }

    function purchaseComplete(
        address _buyer,
        address _tokenAddress,
        address _erc20,
        uint _tokenId,
        ISuperToken token
    ) public {
        require(msg.sender == admin, "Only owner function");
        for (uint i = 0; i < addressToBuyer[_buyer].length; i++) {
            if (
                addressToBuyer[_buyer][i].tokenAddress == _tokenAddress &&
                addressToBuyer[_buyer][i].tokenId == _tokenId
            ) {
                if (
                    block.timestamp >= addressToBuyer[_buyer][i].estimatedTime
                ) {
                    if (addressToBuyer[_buyer][i].timeStopped == 0) {
                        // delete stream
                        // into contract
                        if (
                            token.getFlowRate(msg.sender, address(this)) ==
                            addressToBuyer[_buyer][i].flowRate
                        ) {
                            deleteFlowIntoContract(token, _buyer);
                        } else {
                            updateFlowIntoContract(
                                token,
                                (token.getFlowRate(msg.sender, address(this)) -
                                    addressToBuyer[_buyer][i].flowRate),
                                _buyer
                            );
                        }
                        // from contract
                        if (
                            token.getFlowRate(
                                address(this),
                                addressToBuyer[_buyer][i].seller
                            ) == addressToBuyer[_buyer][i].flowRate
                        ) {
                            deleteFlowFromContract(
                                token,
                                addressToBuyer[_buyer][i].seller
                            );
                        } else {
                            updateFlowFromContract(
                                token,
                                addressToBuyer[_buyer][i].seller,
                                token.getFlowRate(
                                    address(this),
                                    addressToBuyer[_buyer][i].seller
                                ) + addressToBuyer[_buyer][i].flowRate
                            );
                        }
                        // return colletral
                        addressToBuyer[_buyer][i].timeStopped = addressToBuyer[
                            _buyer
                        ][i].estimatedTime;
                        IERC20(_erc20).transfer(
                            _buyer,
                            addressToBuyer[_buyer][i].price
                        );
                        // transfer nft to the buyer
                        ERC721(_tokenAddress).safeTransferFrom(
                            address(this),
                            _buyer,
                            _tokenId
                        );
                        break;
                    }
                }
            }
        }
    }

    // worked properly
    function streamStoppedByUser(
        address _buyer,
        address _tokenAddress,
        address _erc20,
        uint _tokenId,
        uint returnValue,
        ISuperToken token
    ) public {
        require(msg.sender == admin, "Only owner function");
        for (uint i = 0; i < addressToBuyer[_buyer].length; i++) {
            if (
                addressToBuyer[_buyer][i].tokenAddress == _tokenAddress &&
                addressToBuyer[_buyer][i].tokenId == _tokenId
            ) {
                if (addressToBuyer[_buyer][i].timeStopped == 0) {
                    addressToBuyer[_buyer][i].timeStopped = block.timestamp;
                    if (
                        token.getFlowRate(
                            address(this),
                            addressToBuyer[_buyer][i].seller
                        ) == addressToBuyer[_buyer][i].flowRate
                    ) {
                        deleteFlowFromContract(
                            token,
                            addressToBuyer[_buyer][i].seller
                        );
                    } else {
                        updateFlowFromContract(
                            token,
                            addressToBuyer[_buyer][i].seller,
                            token.getFlowRate(
                                address(this),
                                addressToBuyer[_buyer][i].seller
                            ) + addressToBuyer[_buyer][i].flowRate
                        );
                    }
                    // return nft to the seller
                    ERC721(_tokenAddress).safeTransferFrom(
                        address(this),
                        addressToBuyer[_buyer][i].seller,
                        _tokenId
                    );
                    // return remaining colletral to the user
                    IERC20(_erc20).transfer(_buyer, returnValue);
                    // change selling status
                    for (
                        uint j = 0;
                        j <
                        addressToTokens[addressToBuyer[_buyer][i].seller]
                            .length;
                        j++
                    ) {
                        if (
                            addressToTokens[addressToBuyer[_buyer][i].seller][j]
                                .tokenId ==
                            _tokenId &&
                            addressToTokens[addressToBuyer[_buyer][i].seller][j]
                                .tokenAddress ==
                            _tokenAddress
                        ) {
                            addressToTokens[addressToBuyer[_buyer][i].seller][j]
                                .isSold = false;
                            delete addressToTokens[
                                addressToBuyer[_buyer][i].seller
                            ][j];
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) public pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function createFlowIntoContract(ISuperToken token, int96 flowRate) public {
        token.createFlowFrom(msg.sender, address(this), flowRate);
    }

    function updateFlowIntoContract(
        ISuperToken token,
        int96 flowRate,
        address _buyer
    ) public {
        token.updateFlowFrom(_buyer, address(this), flowRate);
    }

    function deleteFlowIntoContract(ISuperToken token, address _buyer) public {
        token.deleteFlow(_buyer, address(this));
    }

    function createFlowFromContract(
        ISuperToken token,
        address receiver,
        int96 flowRate
    ) public {
        token.createFlow(receiver, flowRate);
    }

    function updateFlowFromContract(
        ISuperToken token,
        address receiver,
        int96 flowRate
    ) public {
        token.updateFlow(receiver, flowRate);
    }

    function deleteFlowFromContract(
        ISuperToken token,
        address receiver
    ) public {
        token.deleteFlow(address(this), receiver);
    }

    function getSellers() public view returns (address[] memory) {
        return sellers;
    }

    function getBuyers() public view returns (address[] memory) {
        return buyers;
    }

    function getSellerData(
        address _seller
    ) public view returns (Tokens[] memory) {
        return addressToTokens[_seller];
    }

    function getBuyerData(address _buyer) public view returns (Buyer[] memory) {
        return addressToBuyer[_buyer];
    }
}
