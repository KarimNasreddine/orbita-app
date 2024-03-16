import React, { useState } from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onClick: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  onClick,
}) => {
  const handleClick = (step: number) => {
    onClick(step);
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        return (
          <React.Fragment key={stepNumber}>
            <button
              disabled={stepNumber > currentStep}
              className={`flex justify-center items-center w-10 h-10 rounded-full ${
                isActive ? "bg-orbita-iris" : "bg-gray-300"
              } text-white`}
              onClick={() => handleClick(stepNumber)}
            >
              {stepNumber}
            </button>

            {stepNumber < totalSteps && (
              <div className="flex-auto border-t-2 border-divider-lines"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
