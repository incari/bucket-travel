import React from "react";

export const TabButton = ({
  label,
  isActive,
  onClick,
  placement = "center",
}: {
  label: string;
  isActive: boolean;
  onClick?: () => void;
  placement?: "left" | "center" | "right";
}) => (
  <button
    onClick={onClick}
    className={`py-3 px-5 ${
      placement === "left"
        ? "rounded-l-full"
        : placement === "right"
        ? "rounded-r-full"
        : ""
    }  ${isActive ? "bg-[#F3F3F3]" : "bg-transparent"}`}
  >
    {label}
  </button>
);
