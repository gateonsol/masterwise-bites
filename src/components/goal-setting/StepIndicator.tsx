
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((stepNumber) => (
          <div 
            key={stepNumber}
            className="flex flex-col items-center"
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStep === stepNumber
                  ? 'bg-primary text-white shadow-md'
                  : currentStep > stepNumber
                  ? 'bg-primary/20 text-primary'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {currentStep > stepNumber ? <Check size={16} /> : stepNumber}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {stepNumber === 1 && 'Skill'}
              {stepNumber === 2 && 'Timeframe'}
              {stepNumber === 3 && 'Level'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative mt-2">
        <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-100">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${(currentStep - 1) * 50}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
