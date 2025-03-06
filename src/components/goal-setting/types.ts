
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface GoalData {
  skill: string;
  timeframe: number;
  level: SkillLevel;
}
