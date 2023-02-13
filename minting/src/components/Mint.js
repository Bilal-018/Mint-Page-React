import React from "react";

export default function Mint() {
  return (
    <>
      <div className="mx-auto p-5 md:p-10 max-w-[1400px]">
        <div className="flex flex-wrap lg:flex-nowrap min-h-[766px] items-center justify-center gap-x-10 gap-y-5">
            <div className="h-3/4"><img className="rounded-xl h-full" src="/img/nft.jpg" alt="nft"/></div>

            <div className="w-full text-center lg:text-start rounded-3xl max-w-[580px] p-5 bg-zinc-800">
                <h1 className="text-4xl font-medium">Claim NFTs</h1>
                <p>Enter how many NFTs you want to mint here</p>

                <div className="border-2 py-1 px-2 rounded-xl flex justify-center lg:justify-between my-5">
                    <div className="h-[130px] w-[130px] hidden lg:block"><img className="rounded-xl h-full" src="/img/nft.jpg" alt="nft"/></div>
                    <div className="flex flex-col justify-around text-lg text-center lg:text-right">
                        <p>Price Per NFT</p>
                        <h5 className="text-2xl font-bold">0.01 ETH Each</h5>
                        <p>Public mint is Live</p>
                    </div>
                </div>

                <div className="border-2 rounded-lg bg-zinc-600 p-2 my-7 flex justify-between">
                    <div className="text-2xl font-medium flex space-x-5">
                        <button className="px-2">
                            -
                        </button>
                        <p>1</p>
                        <button className="px-2">
                            +
                        </button>
                    </div>
                    <h5 className="text-2xl font-bold">10 Max</h5>
                </div>

                <div className="border-t border-b p-2 flex justify-between items-center">
                    <p>Total</p>
                    <h5 className="text-2xl font-bold">0.010 ETH</h5>
                </div>

                <button className="bg-white text-black text-xl w-full mt-7 p-3 rounded-xl">
                    MINT NOW
                </button>
            </div>
        </div>
      </div>
    </>
  );
}
