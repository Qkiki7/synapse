"use client";

import Link from "next/link";
import React, { useState } from "react";

type HeartisButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function HeartisButton({
  children,
  href,
  onClick,
  className = "",
}: HeartisButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // 动画时间
    if (onClick) onClick();
  };

  const baseClasses = `
    inline-block
    px-16 py-3
    text-lg
    font-semibold
    tracking-wide
    text-white
    bg-[rgba(255,255,255,0.15)]
    backdrop-blur-md
    rounded-[20px]
    border border-[rgba(255,255,255,0.25)]
    shadow-[0_4px_16px_rgba(0,0,0,0.15)]
    transition-all duration-500 ease-out
    hover:bg-[rgba(255,255,255,0.25)]
    hover:shadow-[0_0_25px_rgba(255,200,120,0.45)]
    hover:border-[rgba(255,230,180,0.6)]
    active:scale-95
  `;

  const clickClasses = isClicked
    ? "animate-heartis-click"
    : "";

  const button = (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${clickClasses} ${className}`}
    >
      {children}
    </button>
  );

  return (
    <>
      {href ? <Link href={href}>{button}</Link> : button}
      <style jsx>{`
        @keyframes heartis-click {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255, 200, 120, 0);
          }
          40% {
            transform: scale(0.96);
            box-shadow: 0 0 30px rgba(255, 220, 150, 0.6);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255, 200, 120, 0);
          }
        }

        .animate-heartis-click {
          animation: heartis-click 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
