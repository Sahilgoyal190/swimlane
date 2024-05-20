import { Priority } from '../types';

export const RULES = [
  {
    id: 'priority',
    label: 'Task Priority'
  },
  {
    id: 'releaseDate',
    label: 'Release Date'
  },
  {
    id: 'dueDate',
    label: 'Due Date'
  }
];

const LOW = 'low';
const MEDIUM = 'medium';
const HIGH = 'high';

export const PRIORITY: Priority[] = [
  {
    id: LOW,
    label: 'Low'
  },
  {
    id: MEDIUM,
    label: 'Medium'
  },
  {
    id: HIGH,
    label: 'High'
  }
];

export const BLOCK_PRIORITY_COLORS_MAP: Record<string, string> = {
  [LOW]: '#e7dba0',
  [MEDIUM]: 'rgba(0, 255, 0, 0.2)',
  [HIGH]: 'rgba(0, 0, 255, 0.2)'
};

export const SWIMLANE_COLORS = [
  '#e3e7e7',
  '#c7d0d0',
  '#abb9b9',
  '#b4bfd4',
  '#9dacc7'
];
