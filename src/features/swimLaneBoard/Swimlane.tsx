import { useSelector } from 'react-redux';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { updateBlockAction } from '@/slices/lanesSlice';
import { isNotFollowingLaneRules } from '@/features/swimLaneBoard/validator';
import { toggleBlockForm } from '@/features/swimLaneBoard/slices/blockSlice';
import { RootState } from '@/store';
import Lane from './components/Lane';
import { Grid } from '@mui/material';
import { useAppDispatch } from '@/store/dispatch';
import { Block } from '@/types';

const SwimLane = () => {
  const lanes = useSelector((state: RootState) => state.lanes);
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: {
    source: { droppableId: string };
    destination: { droppableId: string; index: number };
    draggableId: string;
  }) => {
    const { source, destination } = result;
    if (!destination) return;

    const [sourceLaneId, destinationLaneId] = [
      source.droppableId,
      destination.droppableId
    ];
    const blockId = result.draggableId;

    const sourceLane = lanes.find(lane => lane.id === sourceLaneId);
    const block = sourceLane?.blocks.find(block => block.id === blockId);
    const destinationLane = lanes.find(lane => lane.id === destinationLaneId);
    if (!block || !destinationLane || !sourceLane) return;

    const isNotValidValidMove = isNotFollowingLaneRules(block, destinationLane);

    if (isNotValidValidMove) {
      dispatch(
        toggleBlockForm({
          open: true,
          blockData: block,
          isEditFlow: true,
          showValidation: true
        })
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { blocks, ...destinationLaneRestProps } = destinationLane;
      const updatedBlock = { ...block, status: destinationLaneRestProps };
      dispatch(
        updateBlockAction({
          originalBlock: block as Block,
          updateBlock: updatedBlock as Block,
          blockIndex: destination.index
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd as OnDragEndResponder}>
      <Grid container justifyContent={'space-between'}>
        {lanes.map((lane, index) => (
          <Lane key={lane.id} lane={lane} index={index} />
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default SwimLane;
