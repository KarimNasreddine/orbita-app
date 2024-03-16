import React from "react";

type CheckmarkProps = {
  width?: number;
  height?: number;
  variant: "primary" | "secondary";
};

const Checkmark: React.FC<CheckmarkProps> = ({ width, height, variant }) => {
  const w = width || 6;
  const h = height || 6;
  const color = variant === "primary" ? "text-orbita-iris" : "text-black";
  return (
    <div className="flex items-center">
      <svg
        className={`fill-current ${color} w-${w} h-${h} mr-2`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-3.5-3.5 1.6-1.6 1.9 1.8 4.9-4.9 1.6 1.6L10 15z" />
      </svg>
    </div>
  );
};

export default Checkmark;
