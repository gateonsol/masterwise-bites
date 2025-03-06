
import { Slider } from '@/components/ui/slider';

interface TimeframeStepProps {
  timeframe: number;
  setTimeframe: (timeframe: number) => void;
  skill: string;
}

const TimeframeStep = ({ timeframe, setTimeframe, skill }: TimeframeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-center">Set your learning timeframe</h2>
        <p className="text-gray-500 text-center text-sm">How long do you want to spend learning {skill}?</p>
      </div>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>30 days</span>
            <span>90 days</span>
            <span>180 days</span>
          </div>
          <Slider
            defaultValue={[timeframe]}
            min={30}
            max={180}
            step={30}
            onValueChange={(values) => setTimeframe(values[0])}
            className="w-full"
          />
          <div className="text-center font-medium text-primary">
            {timeframe} days
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <div className="font-medium mb-1">Estimated commitment:</div>
          <div className="text-xs">
            Based on your selection, you'll need to spend just 5-10 minutes per day to make meaningful progress.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeframeStep;
