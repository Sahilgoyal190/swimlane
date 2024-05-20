import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Lane, Block } from '@/types';
import {
  fetchLanes,
  addLane,
  addBlockToLane,
  deleteLane,
  updateLane
} from '@/services';
import { RootState } from '@/store';
import { moveArrayItem } from '@/utils';

export const fetchLanesAction = createAsyncThunk<
  Lane[],
  void,
  { state: RootState }
>('lanes/fetchAll', async (_params, thunkAPI) => {
  const { lanes } = thunkAPI.getState();
  if (lanes.length) {
    return lanes;
  }
  const data = await fetchLanes();
  return data;
});

export const addLaneAction = createAsyncThunk<Lane, Lane, { state: RootState }>(
  'lane/add',
  async lane => {
    const data = await addLane(lane);
    return data;
  }
);

export const deleteLaneAction = createAsyncThunk<
  Lane[],
  string,
  { state: RootState }
>('lane/delete', async laneId => {
  const data = await deleteLane(laneId);
  return data;
});

export const addBlockToLaneAction = createAsyncThunk<
  Lane,
  { laneId: string; block: Block },
  { state: RootState }
>('lanes/addBlockToLane', async ({ laneId, block }) => {
  const data = await addBlockToLane(laneId, block);
  return data;
});

export const updateBlockAction = createAsyncThunk<
  Lane[],
  { originalBlock: Block; updateBlock: Block; blockIndex?: number | null },
  { state: RootState }
>(
  'lane/updateBlock',
  async ({ originalBlock, updateBlock, blockIndex = null }, _thunkAPI) => {
    const state = _thunkAPI.getState().lanes;
    const [sourceLane, destinationLane] = moveBlockHandler(
      state,
      originalBlock,
      updateBlock,
      blockIndex
    );

    await updateLane(sourceLane);
    if (destinationLane) {
      await updateLane(destinationLane);
    }
    return destinationLane ? [sourceLane, destinationLane] : [sourceLane];
  }
);

const initialState: Lane[] = [];

const moveBlockHandler = (
  state: Lane[],
  originalBlock: Block,
  updateBlock: Block,
  destinationLaneIndex: number | null
): Lane[] => {
  const sourceLane = state.find(lane => lane.id === originalBlock.status.id);
  const destinationLane = state.find(lane => lane.id === updateBlock.status.id);

  if (!sourceLane || !destinationLane) return [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { history, ...blockWithoutHistory } = originalBlock;

  const newBlock = {
    ...updateBlock,
    history: [
      ...originalBlock.history,
      { ...blockWithoutHistory, updatedOn: new Date() }
    ]
  };

  if (sourceLane.id === destinationLane.id) {
    const newSourceLane = {
      ...sourceLane,
      blocks:
        destinationLaneIndex === null
          ? sourceLane.blocks.map(block => {
              if (block.id === originalBlock.id) {
                return newBlock;
              }
              return block;
            })
          : moveArrayItem(
              sourceLane.blocks,
              sourceLane.blocks.findIndex(
                block => block.id === originalBlock.id
              ),
              destinationLaneIndex
            )
    };

    return [newSourceLane];
  } else {
    const newSourceLane = {
      ...sourceLane,
      blocks: sourceLane.blocks.filter(block => block.id !== originalBlock.id)
    };

    const newDestinationLane = {
      ...destinationLane,
      blocks: destinationLaneIndex
        ? destinationLane.blocks
            .slice(0, destinationLaneIndex)
            .concat(newBlock)
            .concat(destinationLane.blocks.slice(destinationLaneIndex))
        : [...destinationLane.blocks, newBlock]
    };

    return [newSourceLane, newDestinationLane];
  }
};

const lanesSlice = createSlice({
  name: 'lanes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLanesAction.fulfilled, (_state, action) => {
      return action.payload;
    });
    builder.addCase(addLaneAction.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(addBlockToLaneAction.fulfilled, (state, action) => {
      const lane = state.find(lane => lane.id === action.payload.id);
      if (!lane) return;
      Object.assign(lane, action.payload);
    });
    builder.addCase(deleteLaneAction.fulfilled, (_state, action) => {
      return action.payload;
    });
    builder.addCase(updateBlockAction.fulfilled, (state, action) => {
      const [sourceLane, destinationLane] = action.payload;
      const sourceLaneIndex = state.findIndex(
        lane => lane.id === sourceLane.id
      );
      state[sourceLaneIndex] = sourceLane;
      if (destinationLane) {
        const destinationLaneIndex = state.findIndex(
          lane => lane.id === destinationLane.id
        );
        state[destinationLaneIndex] = destinationLane;
      }
    });
  }
});

export default lanesSlice.reducer;
