import React, { useState, useRef } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const switchButton = useRef(null);

  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <>
      <nav className="flex bg-black text-white justify-around items-center py-3">
        {switchNetwork && chain?.id != 1 ? (
          <div className="button-container mr-4 invisible">
            {chains.map((x) =>
              x.id === 1 ? (
                <button
                  key={x.id}
                  ref={switchButton}
                  className="connect_wallet button-primary uppercase small w-button font-normal bg-gray-900 "
                  onClick={() => switchNetwork(x.id)}
                >
                  {x.id} Switch to {x.name}
                </button>
              ) : null
            )}
          </div>
        ) : null}

        <h1 className="text-4xl font-sans italic">NFTs</h1>
        {isConnected ? (
          <button onClick={disconnect} className="bg-transparent border rounded-lg px-4 py-1">
            Disconnect Wallet
          </button>
        ) : (
          <button onClick={() => setShowModal(true)} className="bg-transparent border rounded-lg px-4 py-1">
            Connect Wallet
          </button>
        )}
      </nav>

      {/* modal */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 w-[350px] text-slate-200 font-saira rounded-lg shadow-lg relative flex flex-col bg-gray-700 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between py-2 px-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl mb-0 font-semibold">Select Wallet</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {connectors
                    .filter((x) => x.ready && x.id !== connector?.id)
                    .map((x) => (
                      <>
                        {/* <p>{x.id}</p> */}
                        <button
                          className="w-full flex justify-center items-center mb-4 bg-slate-900 py-2 font-medium rounded-2xl"
                          key={x.id}
                          onClick={async () => {
                            await connect({ connector: x });
                            await setShowModal(false);
                            await sleep(4000);
                            if (switchButton.current)
                              await switchButton.current.click();
                          }}
                        >
                          {x.name == "MetaMask" ? (
                            <img
                              src="/walletImages/metamask.webp"
                              className="w-8 mr-3"
                              alt="walletImg"
                            />
                          ) : null}
                          {x.name == "WalletConnect" ? (
                            <img
                              src="/walletImages/WalletConnect-Emblem.png"
                              className="w-8 mr-3"
                              alt="walletImg"
                            />
                          ) : null}
                          {x.name == "Coinbase Wallet" ? (
                            <img
                              src="/walletImages/coinbase.png"
                              className="w-8 mr-3"
                              alt="walletImg"
                            />
                          ) : null}
                          {x.name}
                          {isLoading &&
                            x.id === pendingConnector?.id &&
                            " (connecting)"}
                        </button>
                      </>
                    ))}
                  <>
                    {connectors
                      .filter((x) => x.ready && x.id !== connector?.id)
                      .map((x) =>
                        x.name == "WalletConnect" ? (
                          <button
                            className="w-full lg:hidden flex justify-center items-center mb-4 bg-slate-900 py-2 font-medium rounded-2xl"
                            key={x.id}
                            onClick={async () => {
                              await connect({ connector: x });
                              await setShowModal(false);
                              await sleep(4000);
                              if (switchButton.current)
                                await switchButton.current.click();
                            }}
                          >
                            <img
                              src="/walletImages/metamask.webp"
                              className="w-8 mr-3"
                              alt="walletImg"
                            />
                            MetaMask
                            {isLoading &&
                              x.id === pendingConnector?.id &&
                              " (connecting)"}
                          </button>
                        ) : null
                      )}
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
