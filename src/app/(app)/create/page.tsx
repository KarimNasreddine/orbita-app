"use client";

import { useState } from "react";
import StepIndicator from "@/components/ui/stepIndicator/StepIndicator";
import CreateStepOne from "./CreateStepOne";

import { PaymentType, PaymentMode } from "../../../types/payment";
import CreateStepTwo from "./CreateStepTwo";
import CreateStepThree from "./CreateStepThree";

const Create: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mode, setMode] = useState<PaymentMode | null>(null);
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null);

  const handleStepSelection = (step: number) => {
    setCurrentStep(step);
  };

  const handleModeSelection = (mode: PaymentMode) => {
    setMode(mode);
    setCurrentStep(2);
  };

  const handlePaymentSelection = (payment: PaymentType) => {
    setPaymentType(payment);
    setCurrentStep(3);
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-3xl font-bold mb-8">Create Payment</h1>
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <div className="space-y-6">
              <h1 className="text-lg">
                Setup decentralized payments in 3 easy steps
              </h1>
              <StepIndicator
                currentStep={currentStep}
                totalSteps={3}
                onClick={handleStepSelection}
              />
            </div>
          </div>
          {currentStep === 1 && (
            <CreateStepOne handleModeSelection={handleModeSelection} />
          )}
          {currentStep === 2 && mode && (
            <CreateStepTwo
              mode={mode}
              handlePaymentSelection={handlePaymentSelection}
            />
          )}
          {currentStep === 3 && mode && paymentType && (
            <CreateStepThree mode={mode} paymentType={paymentType} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
