import { Block, Lane } from '@/types';
import { fetchFromLocalStorage, postToLocalStorage } from './utils';

export const fetchLanes = async (): Promise<Lane[]> => {
  const response = fetchFromLocalStorage('lanes');
  if (!response) return [] as Lane[];
  return JSON.parse(response);
};

export const addLane = async (lane: Lane): Promise<Lane> => {
  const lanes = await fetchLanes();
  lanes.push(lane);
  postToLocalStorage('lanes', JSON.stringify(lanes));
  return lane;
};

export const updateLane = async (lane: Lane): Promise<Lane> => {
  const lanes = await fetchLanes();
  const index = lanes.findIndex(l => l.id === lane.id);
  lanes[index] = lane;
  postToLocalStorage('lanes', JSON.stringify(lanes));
  return lane;
};

export const deleteLane = async (laneId: string): Promise<Lane[]> => {
  const lanes = await fetchLanes();
  const updatedLanes = lanes.filter(lane => lane.id !== laneId);
  postToLocalStorage('lanes', JSON.stringify(updatedLanes));
  return updatedLanes;
};

// Updating all Lanes directly but in real this implementation should be done on the server side

export const addBlockToLane = async (
  laneId: string,
  block: Block
): Promise<Lane> => {
  const lanes = await fetchLanes();
  const lane = lanes.find(lane => lane.id === laneId);
  if (!lane) return {} as Lane;
  lane.blocks.push({
    ...block,
    id: `${laneId}-${Date.now()}`,
    history: []
  });
  postToLocalStorage('lanes', JSON.stringify(lanes));
  return lane;
};
