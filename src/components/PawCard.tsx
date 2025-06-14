
import React, { useState } from "react";

interface PawCardProps {
  memberName?: string;
  cardNumber?: string;
  expDate?: string;
  vaultTag?: string; // e.g. VAULT LEGEND #XXX
}

const PawCard = ({
  memberName = "Parris Johnson",
  cardNumber = "4242 2044 0000 9912",
  expDate = "12/28",
  vaultTag = "VAULT LEGEND #001",
}: PawCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Helper for signature strip font
  const signatureFont =
    "font-mono text-xs tracking-wider text-gray-900 whitespace-nowrap";

  return (
    <div
      className="relative w-[350px] h-[220px] perspective-1000 select-none"
      style={{ borderRadius: "26px 80px 80px 26px / 26px 80px 80px 26px" }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${isFlipped ? "rotate-y-180" : ""}`}
        tabIndex={0}
        aria-label="Flip card"
        onClick={() => setIsFlipped((f) => !f)}
        style={{ borderRadius: "26px 80px 80px 26px / 26px 80px 80px 26px" }}
      >
        {/* CARD FRONT: Uploaded image as background, 100% fill */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden overflow-hidden"
          style={{
            borderRadius: "26px 80px 80px 26px / 26px 80px 80px 26px",
            background: `url(/lovable-uploads/71039c98-cfb2-4e43-ade1-7237d24c1fb5.png) center center / cover no-repeat, #111`,
            boxShadow: "0 4px 36px rgba(10,10,10,0.18)",
          }}
        ></div>

        {/* CARD BACK: Modern minimal back layout */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 overflow-hidden flex flex-col justify-between"
          style={{
            borderRadius: "26px 80px 80px 26px / 26px 80px 80px 26px",
            background: "linear-gradient(112deg, #fff 85%, #f3f6fa 100%)",
            boxShadow: "0 4px 36px rgba(20,30,80,0.11)",
          }}
        >
          {/* Signature strip */}
          <div className="w-[80%] h-7 bg-gray-100 rounded-md mx-auto mt-9 flex items-center px-4 shadow-sm border border-gray-200">
            <span className={`${signatureFont} opacity-70`}>
              {memberName}
            </span>
          </div>

          {/* Card data */}
          <div className="flex flex-col items-center gap-3">
            {/* Card Number */}
            <div className="text-xl md:text-2xl font-mono tracking-wider text-gray-800 py-2 px-6 rounded-md bg-white/90 shadow-sm border border-gray-100">
              {cardNumber}
            </div>
            {/* Expiry + Vault */}
            <div className="flex justify-between items-end w-[80%]">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-light uppercase tracking-wide">
                  Exp
                </span>
                <span className="text-base font-semibold tracking-widest text-gray-700">{expDate}</span>
              </div>
              <div className="text-xs text-gray-600 font-medium tracking-wider whitespace-nowrap">
                {vaultTag}
              </div>
            </div>
          </div>

          {/* Member Name shown below for symmetry—subtle */}
          <div className="w-full flex justify-center pb-6">
            <span className="text-gray-500 text-xs font-light tracking-wide">
              {memberName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PawCard;
