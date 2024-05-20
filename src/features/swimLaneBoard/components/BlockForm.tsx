import { SyntheticEvent, useState } from 'react';
import { Grid, TextField, Autocomplete, Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { PRIORITY } from '@/constants';
import { RootState } from '@/store';
import { Block, Lane, Priority } from '@/types';
import { isNotFollowingLaneRules } from '@/features/swimLaneBoard/validator';

import {
  addBlockToLaneAction,
  updateBlockAction
} from '../../../slices/lanesSlice';
import History from './History';
import { useAppDispatch } from '@/store/dispatch';

type BlockProps = {
  blockData: Block | unknown;
  handleClose?: () => void;
  isEditFlow?: boolean;
};

const BlockForm = ({
  blockData = {},
  handleClose = () => {},
  isEditFlow = false
}: BlockProps) => {
  const dispatch = useAppDispatch();
  const lanes = useSelector((state: RootState) => state.lanes);
  const [block, setBlock] = useState<Block>(blockData as Block);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlock({ ...block, [e.target.name]: e.target.value });
  };

  const handleSelectChange =
    (name: string) =>
    (
      _event: SyntheticEvent<Element, Event>,
      value: Omit<Lane, 'blocks'> | Priority | null
    ) => {
      setBlock({ ...block, [name]: value });
    };

  const handleAdd = () => {
    if (isEditFlow) {
      dispatch(
        updateBlockAction({
          originalBlock: blockData as Block,
          updateBlock: block
        })
      );
    } else {
      dispatch(
        addBlockToLaneAction({
          laneId: block.status.id,
          block
        })
      );
    }
    handleClose();
  };

  const isDisabled = (): boolean => {
    if (!block.name) return true;
    const lane = lanes.find(lane => lane.id === block.status?.id);
    if (!lane) return true;
    return isNotFollowingLaneRules(block, lane);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label='Title'
          variant='outlined'
          value={block.name}
          name='name'
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          disablePortal
          id='status'
          options={lanes}
          getOptionLabel={option => option.name}
          fullWidth
          renderInput={params => <TextField {...params} label='Status' />}
          value={block.status}
          onChange={handleSelectChange('status')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Description'
          value={block.description}
          onChange={handleChange}
          name='description'
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          disablePortal
          id='priority'
          options={PRIORITY}
          getOptionLabel={option => option.label}
          fullWidth
          renderInput={params => <TextField {...params} label='Status' />}
          onChange={handleSelectChange('priority')}
          value={block.priority}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label='Release Date'
          value={block.releaseDate}
          name='releaseDate'
          type='date'
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Divider />
      <History history={block.history} />
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleAdd}
          disabled={isDisabled()}
        >
          {isEditFlow ? 'Update' : 'Add'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default BlockForm;
