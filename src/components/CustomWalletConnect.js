import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function CustomWalletConnect() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="wallet_parent">
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="wallet_button"
                    >
                      Connect Wallet
                    </button>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <div className="wallet_parent">
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="wallet_button wrong-network"
                    >
                      Wrong network
                      <svg
                        fill="none"
                        height="7"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          xmlns="http://www.w3.org/2000/svg"
                        ></path>
                      </svg>
                    </button>
                  </div>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <div className="wallet_parent">
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                      className="wallet_button chain-button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 6,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 20, height: 20 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}{" "}
                      <svg
                        fill="none"
                        height="7"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          xmlns="http://www.w3.org/2000/svg"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="wallet_parent">
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="wallet_button"
                    >
                      {account.displayName}
                      {/* {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""} */}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default CustomWalletConnect;
