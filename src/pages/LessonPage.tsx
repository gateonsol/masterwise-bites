
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const LessonPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // This would normally be fetched from an API
  const lessonData = {
    id: id,
    title: "Introduction to JavaScript Functions",
    skill: "JavaScript Programming",
    skillId: "2",
    duration: "8 minutes",
    progress: 0,
    content: `
      <h2>What are JavaScript Functions?</h2>
      <p>Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code designed to perform a particular task.</p>
      
      <h3>Function Declaration</h3>
      <pre><code>function greet(name) {
  return "Hello, " + name + "!";
}</code></pre>
      
      <h3>Function Expression</h3>
      <pre><code>const greet = function(name) {
  return "Hello, " + name + "!";
};</code></pre>
      
      <h3>Arrow Functions (ES6)</h3>
      <pre><code>const greet = (name) => {
  return "Hello, " + name + "!";
};</code></pre>
      
      <h2>Practice Exercise</h2>
      <p>Try creating a function that calculates the area of a rectangle given its width and height.</p>
    `
  };
  
  const handleCompleteLesson = () => {
    toast({
      title: "Lesson completed!",
      description: "Great job! You've completed today's lesson.",
    });
  };
  
  return (
    <div className="container px-4 mx-auto py-8 max-w-4xl">
      <div className="mb-6 flex justify-between items-center">
        <Link to={`/skill/${lessonData.skillId}`} className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {lessonData.skill}
        </Link>
        
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1 h-4 w-4" />
          <span>{lessonData.duration}</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-6">{lessonData.title}</h1>
        
        <div className="mb-6">
          <Progress value={lessonData.progress} className="h-2" />
        </div>
        
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: lessonData.content }}
        />
        
        <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-800">
          <Button variant="outline">
            Take Notes
          </Button>
          
          <Button onClick={handleCompleteLesson} className="inline-flex items-center">
            Mark as Complete
            <CheckCircle2 className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="ghost">
          Previous Lesson
        </Button>
        
        <Button variant="ghost" className="inline-flex items-center">
          Next Lesson
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LessonPage;
