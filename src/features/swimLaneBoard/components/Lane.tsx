import { Divider, Paper, Typography } from '@mui/material';
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided
} from 'react-beautiful-dnd';
import BlockView from './BlockView';
import { SWIMLANE_COLORS } from '@/constants';
import { Lane as LaneInterface } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { isAllowedByFilters } from '../validator';

type LaneProps = {
  lane: LaneInterface;
  index: number;
};

const Lane = ({ lane, index }: LaneProps) => {
  const filters = useSelector((state: RootState) => state.filters);

  return (
    <Paper
      style={{
        margin: '8px',
        padding: '8px',
        width: '360px',
        backgroundColor: SWIMLANE_COLORS[index]
      }}
    >
      <Typography variant='h6' textAlign='center'>
        {lane.name}
      </Typography>
      <Divider />
      <Droppable droppableId={lane.id}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ height: '100%' }}
          >
            {lane.blocks?.map((block, index) => {
              if (isAllowedByFilters(block, filters) === false) return null;
              return (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BlockView block={block} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

export default Lane;
