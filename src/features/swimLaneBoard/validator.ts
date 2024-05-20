import { Block, Lane } from '../../types';
import { FilterState } from './slices/filterSlice';

export const isNotFollowingLaneRules = (block: Block, lane: Lane): boolean => {
  if (!lane) return true;
  if (!lane?.rules) return false;
  return lane.rules.some(rule => {
    return !block[rule.id];
  });
};

export const isAllowedByFilters = (block: Block, filters: FilterState) => {
  if (
    filters.priority?.length > 0 &&
    !filters.priority.includes(block.priority?.id)
  )
    return false;

  return true;
};
