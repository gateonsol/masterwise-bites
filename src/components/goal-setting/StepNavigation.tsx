
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface StepNavigationProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onContinue: () => void;
  isLastStep: boolean;
}

const StepNavigation = ({ 
  step, 
  totalSteps,
  onBack, 
  onContinue,
  isLastStep
}: StepNavigationProps) => {
  return (
    <div className="mt-8 flex justify-between">
      {step > 1 ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      <Button type="button" onClick={onContinue} className="group">
        {!isLastStep ? 'Continue' : 'Create My Learning Path'}
        <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
      </Button>
    </div>
  );
};

export default StepNavigation;
