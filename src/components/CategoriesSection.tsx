
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillGrid from '@/components/SkillGrid';

const CategoriesSection = ({ onStartLearning }: { onStartLearning: () => void }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Skills by Category
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse our curated learning paths across various disciplines
          </p>
        </div>
        
        <Tabs defaultValue="tech" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-blue-50/50 dark:bg-gray-800/50 p-1">
              <TabsTrigger value="tech" className="text-xs md:text-sm">Technology</TabsTrigger>
              <TabsTrigger value="business" className="text-xs md:text-sm">Business</TabsTrigger>
              <TabsTrigger value="design" className="text-xs md:text-sm">Design</TabsTrigger>
              <TabsTrigger value="programming" className="text-xs md:text-sm">Programming</TabsTrigger>
              <TabsTrigger value="music" className="text-xs md:text-sm">Music</TabsTrigger>
              <TabsTrigger value="personal" className="text-xs md:text-sm">Personal</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tech" className="animate-fade-in">
            <SkillGrid category="tech" onStart={onStartLearning} />
          </TabsContent>
          
          <TabsContent value="business" className="animate-fade-in">
            <SkillGrid category="business" onStart={onStartLearning} />
          </TabsContent>
          
          <TabsContent value="design" className="animate-fade-in">
            <SkillGrid category="design" onStart={onStartLearning} />
          </TabsContent>
          
          <TabsContent value="programming" className="animate-fade-in">
            <SkillGrid category="programming" onStart={onStartLearning} />
          </TabsContent>
          
          <TabsContent value="music" className="animate-fade-in">
            <SkillGrid category="music" onStart={onStartLearning} />
          </TabsContent>
          
          <TabsContent value="personal" className="animate-fade-in">
            <SkillGrid category="personal" onStart={onStartLearning} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CategoriesSection;
