
import { Button } from '@/components/ui/button';

const CallToActionSection = ({ onStartLearning }: { onStartLearning: () => void }) => {
  return (
    <section className="py-20 bg-blue-50 dark:bg-gray-800/50">
      <div className="container px-4 mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Set up your first skill goal and get personalized daily lessons in just a few minutes.
        </p>
        <Button size="lg" className="px-8" onClick={onStartLearning}>
          Get Started Now
        </Button>
      </div>
    </section>
  );
};

export default CallToActionSection;
