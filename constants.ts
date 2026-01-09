import { Project, Member } from './types';

export const PROJECTS: Project[] = [
  { id: 'p1', name: 'Mobile App Redesign (Q3)' },
  { id: 'p2', name: 'Backend Migration API' },
  { id: 'p3', name: 'Design System Implementation' },
];

export const MEMBERS: Member[] = [
  { id: 'm1', projectId: 'p1', name: 'Alex Johnson', role: 'Senior Frontend Dev' },
  { id: 'm2', projectId: 'p1', name: 'Sarah Chen', role: 'Product Manager' },
  { id: 'm3', projectId: 'p1', name: 'Mike Ross', role: 'QA Engineer' },
  { id: 'm4', projectId: 'p2', name: 'David Kim', role: 'Backend Lead' },
  { id: 'm5', projectId: 'p2', name: 'Elena Rodriguez', role: 'DevOps Engineer' },
  { id: 'm6', projectId: 'p3', name: 'Emily White', role: 'UI/UX Designer' },
  { id: 'm7', projectId: 'p3', name: 'Chris Green', role: 'Frontend Developer' },
];