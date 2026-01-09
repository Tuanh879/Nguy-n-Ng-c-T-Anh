export interface Project {
  id: string;
  name: string;
}

export interface Member {
  id: string;
  projectId: string;
  name: string;
  role: string;
}

export enum SentimentLevel {
  EXCELLENT = 'excellent',
  IMPROVEMENT_NEEDED = 'improvement_needed',
  ACCEPTABLE = 'acceptable'
}

export interface ReviewFormData {
  keepDoing: string;
  startDoing: string;
  stopDoing: string;
  sentiment: SentimentLevel | null;
}