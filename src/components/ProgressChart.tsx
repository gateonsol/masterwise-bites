
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProgressChartProps {
  data: {
    name: string;
    minutes: number;
    lessons: number;
  }[];
  className?: string;
}

const ProgressChart = ({ data, className }: ProgressChartProps) => {
  const [activeMetric, setActiveMetric] = useState<'minutes' | 'lessons'>('minutes');
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100 text-sm">
          <p className="font-medium">{label}</p>
          {activeMetric === 'minutes' ? (
            <p className="text-primary">{`${payload[0].value} minutes`}</p>
          ) : (
            <p className="text-primary">{`${payload[0].value} lessons`}</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Track your daily learning activity</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant={activeMetric === 'minutes' ? 'default' : 'outline'} 
              onClick={() => setActiveMetric('minutes')}
              className="text-xs h-8"
            >
              Time
            </Button>
            <Button 
              size="sm" 
              variant={activeMetric === 'lessons' ? 'default' : 'outline'} 
              onClick={() => setActiveMetric('lessons')}
              className="text-xs h-8"
            >
              Lessons
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              {activeMetric === 'minutes' ? (
                <Area 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorMinutes)" 
                  animationDuration={500}
                />
              ) : (
                <Area 
                  type="monotone" 
                  dataKey="lessons" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorLessons)" 
                  animationDuration={500}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
